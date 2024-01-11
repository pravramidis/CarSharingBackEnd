const { response } = require('express');
const vehicle = require('../models/vehicle');

exports.getMapLimit = async (req, res, next) => {
    try {
        const { City } = req.body;
        console.log(req.body);

        const [limits,_] = await vehicle.getMapLimits(City);
        const response = limits[0];
        

        res.status(200).json({response});   
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.updateLocation = async (req, res, next) => {
    console.log("Attempting to update location");
    console.log(req.body);
    try {
        const { X_Coordinate , Y_Coordinate, Plate} = req.body;
        console.log(req.body);

        await vehicle.updateLocation(Plate, X_Coordinate, Y_Coordinate);

        res.status(200).json({message: 'Success'});   } 
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


exports.changeAvailability = async (req, res,next) => {

    try {
        const { plate, value } = req.body; 

        await vehicle.changeAvailability(plate, value);
        console.log("change availability");
        res.status(200).json({ message: 'Vehicle availability updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    

}

exports.getVehicleCoordinates = async (req, res , next) => {
    try {
        const [cars, _] = await vehicle.getCoordinates();
        console.log("vehicle coordinates");
        for (i = 0; i < cars.length; i++) {
            let object = cars[i];
            let value = object["Plate_number"];
            const [cost,_] = await vehicle.getPrice(value, "Minute");
            object.Price = cost[0].price;
            
        }
        res.status(200).json({cars});
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
    let { Plate_number } = req.body;
	console.log(Plate_number);

    

	try {
		const [car, _] = await vehicle.getCarInfo(Plate_number);
		console.log("get Car info", car);

        

		if (car.length > 0) {
            let object = car[0];
            const [cost_min,] = await vehicle.getPrice(Plate_number, "Minute");
            const [cost_hourly,] = await vehicle.getPrice(Plate_number, "Hourly");
            const [cost_daily,] = await vehicle.getPrice(Plate_number, "Daily");
            console.log(cost_min[0]);
            console.log(cost_hourly[0]);
            console.log(cost_daily[0]);
            object.PriceMin = cost_min[0].price;
            object.PriceHourly = cost_hourly[0].price;
            object.PriceDaily = cost_daily[0].price;

            console.log(object);
            res.json(object);

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
    let modRequest = request;

    console.log("Get filters");

    //Change to the appropriate format
    if (request == "Fuel Type") {
        modRequest = "Fuel_Type";
    }
    if (request == "Capacity") {
        modRequest = "Passenger_capacity"
    }
    
    try {
        const[row, _] = await vehicle.getFilters(modRequest);
        const filters = [];


        for (i = 0; i < row.length; i++) {
            let object = row[i];
            let value = object[modRequest];
            let newJsonObject = {[value]: 'false'};
            filters.push(newJsonObject);
        }
        const response = {[request]: filters};

        res.status(200).json(response);

    } catch (error) {
            
		console.error("Error in getFilters:", error);
    }

    
}

exports.getRelevantCars = async (req, res, next) => {
    let { request } = req.body;
    console.log("Get relevant cars");

    const[cars, _] = await vehicle.getRelevantCars(request);

    for (i = 0; i < cars.length; i++) {
        let object = cars[i];
        let value = object["Plate_number"];
        const [cost,_] = await vehicle.getPrice(value, "Minute");
        object.Price = cost[0].price;
        
    }
    

    res.status(200).json({cars});
}