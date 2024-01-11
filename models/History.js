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
    }

    static getHistory(username) {
        let sql = `Select * from books where FK1_Username= '${username}'`;

        return db.execute(sql,[username]);
    }

}

module.exports = History;