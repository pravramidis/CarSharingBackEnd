const vehicle = require('../models/vehicle');

exports.getVehicleCoordinates = async (req, res , next) => {
    try {
        const [vehicle, _] = await vehicle.getCoordinates();
        console.log("vehicle coordinates");
        console.log(vehicle);

        if(!vehicle) {
			res.status(200).json(vehicle);
		}
		

    }
    catch(error) {
        console.log(error);
        next(error);

    }
}

exports.getPrice = async (req, res , next) => {
    try {
        const [price, _] = await vehicle.getPrice();
        console.log(price);

        if(!price) {
			res.status(200).json(price);
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
    let modRequest = request;

    if (request == "Fuel Type") {
        modRequest = "Fuel_Type";
    }
    if (request == "Capacity") {
        modRequest = "Passenger_capacity"
    }
    
    try {
        const[row, _] = await vehicle.getFilters(modRequest);
        console.log(row);
        const filters = [];


        for (i = 0; i < row.length; i++) {
            let object = row[i];
            let value = object[modRequest];
            console.log(value);
            let newJsonObject = {[value]: 'false'};
            console.log(newJsonObject);
            filters.push(newJsonObject);
        }
        const response = {[request]: filters};

        console.log(response);


        res.status(200).json(response);

    } catch (error) {
            
		console.error("Error in getFilters:", error);
    }

    
}

exports.getRelevantCars = async (req, res, next) => {
    let { request } = req.body;
    console.log("filters");
    console.log(request);

    const[cars, _] = await vehicle.getRelevantCars(request);

    res.status(200).json({cars});
}