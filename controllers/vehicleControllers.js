const vehicle = require('../models/vehicle');

exports.getVehicleCoordinates = async (req, res , next) => {
    try {
        const [vehicle, _] = await vehicle.getCoordinates();
        console.log("vehicle coordinates");

        if(!vehicle) {
			res.status(200).json({user: 'Fail'});
		}
		

    }
    catch(error) {
        console.log(error);
        next(error);

    }
}

exports.getMinPrices = async (req, res , next) => {
    try {
        const [vehicle, _] = await vehicle.getMinutePrices();
        console.log("vehicle coordinates");

        if(!vehicle) {
			res.status(200).json({user: 'Fail'});
		}
		

    }
    catch(error) {
        console.log(error);
        next(error);

    }
}