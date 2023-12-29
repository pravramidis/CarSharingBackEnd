const express = require('express');
const userControllers = require('../controllers/userControllers');
const router = express.Router();

 
router.route("/login").post(userControllers.authenticateUser);
router.route("/register").post(userControllers.createUser);
router.route("/profile").post(userControllers.getUserInfo);
router.route("/update").post(userControllers.updateUser);


module.exports = router;