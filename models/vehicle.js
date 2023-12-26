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

    

}
module.exports = vehicle;