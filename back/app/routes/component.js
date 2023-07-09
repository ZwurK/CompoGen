const express = require("express");
const router = express.Router();
const authenticate = require("../../auth/middlewares/authenticate");
const componentController = require('../controllers/componentController');

router.post('/generate', authenticate,componentController.generate);

router.get('/getUserHistory', authenticate,componentController.getUserHistory);


router.get('/explore',componentController.explore);
router.get('/getOneComponent/:id', componentController.getOneComponent);

router.get('/top', componentController.top);



module.exports = router;