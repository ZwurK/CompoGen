const Newsletter = require("../models/Newsletter");
const { validationResult } = require('express-validator');

exports.subscribeToNewsletter = async (req, res) => {
  const { email } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const existingSubscription = await Newsletter.findOne({ email });

    if (existingSubscription) {
      return res.status(400).json({
        success: false,
        errors: [{ msg: "This email is already subscribed." }], // Envoie sous forme de tableau pour ne pas avoir d'erreur car express validator renvoie également un tableau d'erreurs.
      });
    }

    const subscription = new Newsletter({
      email,
    });

    const savedSubscription = await subscription.save();

    res.json({
      message: "Subscription successful.",
      data: savedSubscription,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occurred while subscribing.",
      error: err.message,
    });
  }
};
