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

	static getPrice(plate, rate) {
		let sql = `select price from costs where FK1_Plate_number = '${plate}' and FK2_Type = '${rate}'`

		return db.execute(sql);
	}

	static getCarInfo(plate) {
		let sql = `Select * from vehicle where Plate_number = '${plate}'`

		return db.execute(sql);
	}

	static getFilters(request) {
		let sql = `Select distinct ${request} from vehicle`

		return db.execute(sql);
	}

	static getRelevantCars(request) {
		let array = request['request']
		console.log(array);

		const filterCategories = [
			"Type",
			"Fuel_Type",
			"Model",
			"Gearbox",
			"Capacity",
			"Color",
			"Brand"
		];
		let isFirstCat = 1;
		let isFirstAttr = 1;
		let flag = 0;
		let flagAddSomething = 0;

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

			console.log(array);
			if (isFirstCat == 1) {
				isFirstCat = 0;
				query += 'where '
				flag = 1;
			}
			isFirstAttr =1;
			flagAddSomething = 0;
			array.forEach(obj => {
				const keys = Object.keys(obj);
				if (isFirstAttr == 1 && query != 'where ') {
					isFirstAttr = 0;
					query += ' and ';
					flag = 1;
				}
				keys.forEach(key => {
				  const value = obj[key];
				  if (value == 'True') {
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
				  	console.log(query);
				  }
				});
			});
			if (flagAddSomething == 1) {
				query += ')'
			}
		}
		
		let sql = 'select Model, Brand, Plate_number, X_Coordinates, Y_Coordinates from vehicle ';
		if (query == 'where ') {
			console.log(sql);
			return db.execute(sql);
		}
		sql += query;
		sql += ' and available = 1'
		
		console.log(sql);
		return db.execute(sql);
	}
    

}
module.exports = vehicle;