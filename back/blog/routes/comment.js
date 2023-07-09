const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authenticate = require("../../auth/middlewares/authenticate");
const admin = require("../../auth/middlewares/admin");

// Authenticate middleware
router.use(authenticate);

// Admin middleware
router.use(admin);

// Create a new Comment
router.post("/create", commentController.create);

// Retrieve all Comments
router.get("/fetchAll", commentController.findAll);

// Retrieve a single Comment with id
router.get("/fetch/:id", commentController.findOne);

// Update a Comment with id
router.put("/edit/:id", commentController.update);

// Delete a Comment with id
router.delete("/delete/:id", commentController.delete);

module.exports = router;
