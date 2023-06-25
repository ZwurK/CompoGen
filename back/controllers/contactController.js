const Contact = require("../models/Contact");

exports.sendContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newMessage = new Contact({
      name,
      email,
      message
    });

    const savedMessage = await newMessage.save();

    res.json({
      message: "Form submitted successfully.",
      data: savedMessage
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occurred while submitting the form.",
      error: err.message
    });
  }
};
