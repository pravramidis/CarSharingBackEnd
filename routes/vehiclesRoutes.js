const express = require('express');
const vehicleControllers = require('../controllers/vehicleControllers');
const router = express.Router();

// router.route("/home").post(vehicleControllers.getVehicleCoordinates);
// router.route("/home").post(vehicleControllers.getMinPrices);
router.route("/carInfo").post(vehicleControllers.getCarInfo);
router.route("/filters").post(vehicleControllers.getFilters);
module.exports = router;