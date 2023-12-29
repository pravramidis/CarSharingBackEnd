const express = require('express');
const userControllers = require('../controllers/vehicleControllers');
const router = express.Router();

router.route("/home").post(vehicleControllers.getVehicleCoordinates);
router.route("/home").post(vehicleControllers.getMinPrices);
module.exports = router;