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
		const [car, _] = await vehicle.getCarInfo(plate);
		console.log("get Car info", car[0]);

        let object = car[0];
        const [cost_min,] = await vehicle.getPrice(plate, "Minute");
        const [cost_hourly,] = await vehicle.getPrice(plate, "Hourly");
        const [cost_daily,] = await vehicle.getPrice(plate, "Daily");
        console.log(cost_min[0]);
        console.log(cost_hourly[0]);
        console.log(cost_daily[0]);
        object.PriceMin = cost_min[0].price;
        object.PriceHourly = cost_hourly[0].price;
        object.PriceDaily = cost_daily[0].price;

        console.log(object);

		if (car.length > 0) {
			res.json(object); // Send the car data as JSON
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
    console.log(cars);

    for (i = 0; i < cars.length; i++) {
        let object = cars[i];
        let value = object["Plate_number"];
        console.log(value);
        const [cost,_] = await vehicle.getPrice(value, "Minute");
        console.log(cost[0]);
        object.Price = cost[0].price;
        console.log(cars);
        
    }
    

    res.status(200).json({cars});
}