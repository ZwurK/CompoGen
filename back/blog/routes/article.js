const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");

// Create a new Article
router.post("/create", articleController.create);

// Retrieve all Articles
router.get("/fetchAll", articleController.findAll);

// Retrieve a single Article with id
router.get("/fetch/:id", articleController.findOne);

// Update a Article with id
router.put("/edit/:id", articleController.update);

// Delete a Article with id
router.delete("/delete/:id", articleController.delete);


module.exports = router;
