const express = require('express');
const userControllers = require('../controllers/userControllers');
const router = express.Router();

 
router.route("/").post(userControllers.authenticateUser);
// router.route("/").post(userControllers.createUser);


module.exports = router;