const Newsletter = require("../models/Newsletter");

exports.subscribeToNewsletter = async (req, res) => {
  const { email } = req.body;

  try {
    const subscription = new Newsletter({
      email
    });

    const savedSubscription = await subscription.save();

    res.json({
      message: "Subscription successful.",
      data: savedSubscription
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occurred while subscribing.",
      error: err.message
    });
  }
};
