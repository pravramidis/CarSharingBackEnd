const db = require('../config/db');

class vehicle {
    constructor(plate, type, model, color, brand, gearbox, capacity, avail, fuel, x, y) {
		this.plate = plate;
		this.type = type;
		this.model = model;
		this.color = color;
		this.brand = brand;
		this.gearbox = gearbox;
        this.capacity = capacity;
        this.avail = avail;
        this.fuel = fuel;
        this.x = x;
        this.y = y;
	}

	static getCoordinates() {
		let sql = `Select Plate_number, Brand, Model, X_Coordinates, Y_Coordinates from VEHICLE `;

		return db.execute(sql);
	}

	static getMinutePrices() {
		let sql = `Select FK1_Plate_number, Price from COSTS where FK2_Type = "Minute" `;

		return db.execute(sql);
	}

	static getCarInfo(plate) {
		let sql = `Select * from vehicles where Plate_number = '${plate}'`

		return db.execute(sql);
	}

	static getFilters(request) {
		let sql = `Select distinct ${request} from vehicle`

		return db.execute(sql);
	}

	static getRelevantCars(request) {
		
		



		// return db.execute(sql);
	}
    

}
module.exports = vehicle;