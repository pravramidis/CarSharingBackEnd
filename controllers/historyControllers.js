const History = require('../models/History');

exports.addBooking = async (req, res, next) => {
    try {
        let {Username, PlateNum, Type, Price, Date, Duration} = req.body;

        let history = new History(Username, PlateNum, Type, Price, Date, Duration);

        await history.saveBooking();
        console.log("add to history");
        res.status(201).json({ message: 'Booking successfully added' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
	}
}