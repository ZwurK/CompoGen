const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user._id; 

    // Vérifier si l'utilisateur est connecté
    if (!userId) {
      return res.status(401).json({ message: 'Non authentifié' });
    }

    // Récupérer le profil de l'utilisateur
    const user = await User.findById(userId, { password: 0 });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du profil' });
  }
};


exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;  // change from req.user.userId to req.user._id
    const { username, newPassword } = req.body;

    // Vérifier si l'utilisateur est connecté
    if (!userId) {
      return res.status(401).json({ message: 'Non authentifié' });
    }

    // Récupérer l'utilisateur existant
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Valider les données de mise à jour du profil
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Mettre à jour les informations du profil
    if (username) {
      user.username = username;
    }
    if (newPassword) {
      user.password = await bcrypt.hash(newPassword, 10);
    }
    await user.save();

    return res.status(200).json({ message: 'Profil mis à jour avec succès' });
  } catch (error) {
    return res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du profil' });
  }
};


