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

	static getMapLimits(City) {
		let sql =  `Select * from City where City_Name = '${City}'`

		return db.execute(sql);
	}

	static updateLocation(plate, x_coord, y_coord) {
		let sql = `	UPDATE vehicle
					SET X_Coordinates = ${x_coord}, Y_Coordinates = ${y_coord}
					WHERE Plate_number = '${plate}';`

		return db.execute(sql);
	}

	static changeAvailability(plate, value) {
		let sql = `update vehicle
		set Available = '${value}'
		where Plate_number='${plate}'`;

		return db.execute(sql,[value, plate]);
	}

	static getCoordinates() {
		let sql = `Select Plate_number, Brand, Model, X_Coordinates, Y_Coordinates, Color from VEHICLE where available = '1'`;

		return db.execute(sql);
	}

	static getPrice(plate, rate) {
		let sql = `select price from costs where FK1_Plate_number = '${plate}' and FK2_Type = '${rate}'`

		return db.execute(sql);
	}

	static getCarInfo(plate) {
		let sql = `Select * from vehicle where Plate_number = '${plate}'`;

		return db.execute(sql,[plate]);
	}


	static getFilters(request) {
		let sql = `Select distinct ${request} from vehicle`

		return db.execute(sql);
	}

	//This creates an sql query based on a json file
	static getRelevantCars(request) {
		let array = request['request']

		const filterCategories = [
			"Type",
			"Fuel Type",
			"Gearbox",
			"Capacity",
			"Color",
			"Brand"
		];
		let isFirstCat = 1;
		let isFirstAttr = 1;
		let flag = 0;
		let flagAddSomething = 0;
		let isFirstInLoop = 1;

		let query = '';

		for (let i = 0; i < filterCategories.length; i++) {
			let currCategory = filterCategories[i];
			let array = request[currCategory];

			if (currCategory == "Fuel Type") {
				currCategory = "Fuel_Type";
			}
			if (currCategory == "Capacity") {
				currCategory = "Passenger_capacity"
			}

			if (isFirstCat == 1) {
				isFirstCat = 0;
				query += 'where '
				flag = 1;
			}
			isFirstAttr =1;
			flagAddSomething = 0;
			array.forEach(obj => {
				const keys = Object.keys(obj);
				keys.forEach(key => {
				  const value = obj[key];
				  if (value == 'True') {
					if (isFirstAttr == 1 && query != 'where ' && isFirstInLoop == 0) {
						isFirstAttr = 0;
						query += ' and ';
						flag = 1;
					}
					flagAddSomething = 1;
					if (flag != 1) {
						query += ',';
					}
					else {
						query += currCategory;
						query += ' IN ('
						flag = 0;
					}
					if (currCategory == "Passenger_capacity" || currCategory == "Gearbox") {
						query +=`${key}`;
					}
					else {
						query += `'${key}'`;
					}
				  }
				});
			});
			if (flagAddSomething == 1) {
				isFirstInLoop = 0;
				query += ')'
			}
		}
		
		let sql = 'select Model, Brand, Plate_number, X_Coordinates, Y_Coordinates, Color from vehicle ';
		if (query == 'where ') {
			sql += ' where available = 1'
			console.log("Final query based on the filters");
			console.log(sql);
			return db.execute(sql);
		}
		sql += query;
		sql += ' and available = 1'
		
		console.log("Final query based on the filters");
		console.log(sql);
		return db.execute(sql);
	}
    

}
module.exports = vehicle;