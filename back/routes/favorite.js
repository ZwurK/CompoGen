const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const favoriteController = require('../controllers/favoriteController');

router.put('/like/:id', authenticate, favoriteController.like);
router.put('/unlike/:id', authenticate, favoriteController.unlike);
router.get('/getUserFavorites', authenticate, favoriteController.getUserFavorites);

module.exports = router;