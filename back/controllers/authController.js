const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const crypto = require("crypto");
const User = require("../models/User");
const transporter = require("../config/email");

// Utilisez process.env.JWT_SECRET pour accéder à la clé secrète JWT
const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Cet email est déjà utilisé, connectez-vous." });
    }

    // Créer un nouvel utilisateur
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return res.status(200).json({ message: "Inscription réussie" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Une erreur est survenue lors de l'inscription" });
  }
};

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Récupérer la valeur de TOKEN_EXPIRY depuis le fichier .env
    const tokenExpiry = process.env.TOKEN_EXPIRY;

    // Générer un token JWT avec la durée de validité définie par TOKEN_EXPIRY
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: tokenExpiry,
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Une erreur est survenue lors de la connexion" });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email non trouvé" });
    }

    // Générer un token de réinitialisation de mot de passe
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token valide pendant 1 heure
    await user.save();

    // Envoyer un e-mail de réinitialisation de mot de passe à l'utilisateur
    const mailOptions = {
      from: "your-email@example.com", // Remplacez par votre adresse e-mail
      to: user.email, // Utilisez l'adresse e-mail de l'utilisateur
      subject: "Demande de réinitialisation de mot de passe",
      text: `Pour réinitialiser votre mot de passe, veuillez cliquer sur le lien suivant : https://your-app.com/reset-password/${resetToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({
          message: "Une erreur est survenue lors de l'envoi de l'e-mail",
        });
      }
      return res.status(200).json({
        message: "Un e-mail de réinitialisation de mot de passe a été envoyé",
      });
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "Une erreur est survenue lors de la demande de réinitialisation de mot de passe",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { resetToken, password } = req.body;

    // Vérifier si le token de réinitialisation est valide
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    console.log(user);

    if (!user) {
      return res.status(400).json({
        message: "Token de réinitialisation de mot de passe invalide ou expiré",
      });
    }

    // Réinitialiser le mot de passe
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res
      .status(200)
      .json({ message: "Mot de passe réinitialisé avec succès" });
  } catch (error) {
    return res.status(500).json({
      message:
        "Une erreur est survenue lors de la réinitialisation du mot de passe",
    });
  }
};
