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

exports.getCarInfo = async (req,res,next) => {
    let { plate } = req.body;
	console.log(plate);

	try {
		const [rows, _] = await vehicle.getInfo(plate);
		console.log("user getInfo", rows);

		// Assuming you're expecting one car or none
		if (rows.length > 0) {
			res.json(rows[0]); // Send the car data as JSON
		} else {
			res.status(404).json({ message: "Car not found" });
		}
	} catch (error) {
		console.error("Error in getCarInfo:", error);
		res.status(500).json({ message: "Internal server error" });
	}
}

exports.getFilters = async (req, res, next) => {
    let { request } = req.body;
    console.log(request);


    
    try {
        const[row, _] = await vehicle.getFilters(request);
        console.log(row);
        res.status(200).json(row);

    } catch (error) {
            
		console.error("Error in getFilters:", error);
    }

    
}