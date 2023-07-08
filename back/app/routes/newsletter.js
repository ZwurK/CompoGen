const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  subscribeToNewsletter,
} = require("../controllers/newsletterController");

router.post(
  "/subscribe",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Invalid email."),
  ],
  subscribeToNewsletter
);

module.exports = router;
