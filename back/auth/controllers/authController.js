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
        .json({ message: "This email is already in use, please sign in." });
    }

    // Créer un nouvel utilisateur
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return res.status(200).json({ message: "Successful registration." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred during registration." });
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
        .json({ message: "Incorrect email address or password." });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Incorrect email address or password." });
    }

    // Récupérer la valeur de TOKEN_EXPIRY depuis le fichier .env
    const tokenExpiry = process.env.TOKEN_EXPIRY;

    // Générer un token JWT avec la durée de validité définie par TOKEN_EXPIRY
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: tokenExpiry,
    });

    // Créer un objet avec les informations de l'utilisateur à renvoyer
    const userData = {
      _id: user._id,
      email: user.email,
      likedComponents: user.likedComponents,
      generatedComponents: user.generatedComponents,
      numberGeneration: user.numberGeneration
      // Ajoutez ici toutes les autres informations de l'utilisateur que vous voulez renvoyer
    };

    return res.status(200).json({ token, user: userData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error has occurred during connection." });
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
      return res.status(400).json({ message: "Email not found." });
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
      subject: "Request for password reset.",
      text: `To reset your password, click on the following link: https://your-app.com/reset-password/${resetToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({
          message: "An error has occurred while sending the e-mail.",
        });
      }
      return res.status(200).json({
        message: "A password reset email has been sent.",
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error has occurred when requesting a password reset.",
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
        message: "Invalid or expired password reset token.",
      });
    }

    // Réinitialiser le mot de passe
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({ message: "Password successfully reset." });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred when resetting the password.",
    });
  }
};

exports.saveApiKey = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Sauvegarder la clé API
    user.apiKey = req.body.apiKey;
    await user.save();

    res.json({ message: "API key saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};
