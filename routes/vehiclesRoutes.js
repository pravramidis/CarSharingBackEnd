const express = require('express');
const vehicleControllers = require('../controllers/vehicleControllers');
const router = express.Router();

router.route("/coordinates").post(vehicleControllers.getVehicleCoordinates);
router.route("/price").post(vehicleControllers.getPrice);
router.route("/carInfo").post(vehicleControllers.getCarInfo);
router.route("/filters").post(vehicleControllers.getFilters);
router.route("/search").post(vehicleControllers.getRelevantCars);
module.exports = router;