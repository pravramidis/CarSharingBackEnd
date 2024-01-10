const express = require('express');
const vehicleControllers = require('../controllers/vehicleControllers');
const router = express.Router();

router.route("/coordinates").get(vehicleControllers.getVehicleCoordinates);
router.route("/price").post(vehicleControllers.getPrice);
router.route("/carInfo").post(vehicleControllers.getCarInfo);
router.route("/filters").post(vehicleControllers.getFilters);
router.route("/search").post(vehicleControllers.getRelevantCars);
router.route("/availability").post(vehicleControllers.changeAvailability);
router.route("/updateLocation").post(vehicleControllers.updateLocation);
router.route("/mapLimits").post(vehicleControllers.getMapLimit);
module.exports = router;