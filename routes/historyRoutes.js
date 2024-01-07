const express = require('express');
const historyControllers = require('../controllers/historyControllers');
const router = express.Router();

router.route("/booking").post(historyControllers.addBooking);
router.route("/getHistory").post(historyControllers.getUsersHistory);

module.exports = router;