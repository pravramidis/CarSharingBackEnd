const db = require('../config/db');

class History{
    constructor(user,plate,type,price,payDate,duration) {
        this.user = user;
        this.plate = plate;
        this.type = type;
        this.price = price;
        this.payDate = payDate;
        this.duration = duration;
    }

    async saveBooking() {
        let insertSql = `INSERT INTO books (Price, Payment_date, Trip_duration, FK1_Username, FK2_Plate_number, FK3_Type)
        VALUES ('${this.price}' , '${this.payDate}' , '${this.duration}' , '${this.user}' , '${this.plate}' , '${this.type}')`;


        try {
            await db.execute(insertSql, [this.price, this.payDate, this.duration, this.user, this.plate, this.type]);
            return { response: 'Booking inserted' };
        } catch (error) {
            throw error;
        }
        // const newHistory = await db.execute(insertSql);
        // return {response: 'Booking inserted'};
    }

}

module.exports = History;