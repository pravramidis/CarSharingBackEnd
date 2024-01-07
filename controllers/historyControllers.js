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

exports.getUsersHistory = async (req, res, next) => {
	let { Username } = req.body;
	console.log(Username);

	try {
		const [rows, _] = await History.getHistory(Username);
		console.log("history getHistory", rows);

        res.status(200).json({rows});

		
        
	} catch (error) {
		console.error("Error in getUsersHistory:", error);
		res.status(500).json({ message: "Internal server error" });
	}
}