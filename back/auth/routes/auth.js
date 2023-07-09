const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { body } = require("express-validator");
const authenticate = require('../middlewares/authenticate');

// Route pour l'inscription
router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Le nom d'utilisateur est requis").isLength({ max: 50 }).withMessage('Le nom d\'utilisateur ne doit pas dépasser 50 caractères'),
    body("email")
      .notEmpty()
      .withMessage("L'email est requis")
      .isEmail()
      .withMessage("L'email n'est pas valide"),
    body("password")
      .notEmpty()
      .withMessage("Le mot de passe est requis")
      .isStrongPassword()
      .withMessage("Le mot de passe doit avoir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un symbole"),
  ],
  authController.register
);

// Route pour la connexion
router.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .withMessage("L'email est requis")
      .isEmail()
      .withMessage("L'email n'est pas valide"),
    body("password").notEmpty().withMessage("Le mot de passe est requis"),
  ],
  authController.login
);

// Route pour la demande de réinitialisation de mot de passe
router.post(
  "/forgot-password",
  [
    body("email")
      .notEmpty()
      .withMessage("L'email est requis")
      .isEmail()
      .withMessage("L'email n'est pas valide"),
  ],
  authController.forgotPassword
);

// Route pour la réinitialisation du mot de passe
router.post(
  "/reset-password",
  [
    body("password").notEmpty().withMessage("Le mot de passe est requis"),
    body("confirmPassword")
      .notEmpty()
      .withMessage("La confirmation du mot de passe est requise")
      .custom((value, { req }) => value === req.body.password)
      .withMessage("Les mots de passe ne correspondent pas")
      .isStrongPassword()
      .withMessage("Le mot de passe doit avoir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un symbole"),
  ],
  authController.resetPassword
);

router.post('/save-api-key', authenticate, authController.saveApiKey);

module.exports = router;
