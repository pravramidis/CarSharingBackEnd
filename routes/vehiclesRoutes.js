const express = require('express');
const vehicleControllers = require('../controllers/vehicleControllers');
const router = express.Router();

// router.route("/home").post(vehicleControllers.getVehicleCoordinates);
// router.route("/home").post(vehicleControllers.getMinPrices);
router.route("/carInfo").get(vehicleControllers.getCarInfo);
router.route("/filters").post(vehicleControllers.getFilters);
router.route("/search").post(vehicleControllers.getRelevantCars);
module.exports = router;