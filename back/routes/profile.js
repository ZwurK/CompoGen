const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { body } = require('express-validator');
const authenticate = require('../middlewares/authenticate');

// Routes nécessitant une authentification
router.use(authenticate);

// Route pour récupérer le profil de l'utilisateur
router.get('/', profileController.getProfile);

// Route pour mettre à jour le profil de l'utilisateur
router.put('/', [
  body('username').optional().notEmpty().withMessage('Le nom d\'utilisateur est requis').isLength({ max: 50 }).withMessage('Le nom d\'utilisateur ne doit pas dépasser 50 caractères'),
  body('newPassword').optional().notEmpty().withMessage('Vous devez sélectionner un mot de passe.').isStrongPassword().withMessage('Le mot de passe doit avoir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un symbole')
], profileController.updateProfile);

module.exports = router;
