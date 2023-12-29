const User = require('../models/User');

exports.createUser = async (req, res, next) => {
	try {
		let {Username, Password, name, date, licenseId, phoneNumber, email} = req.body;

		let user = new User(Username, Password, name, phoneNumber, licenseId, date, email);
	
		user = await user.save();
		let response = user.response;
		console.log("new user");
		if(response  == "User already exists") {
			res.status(201).json({ message: "User already exists"});
		}
		else {
			res.status(201).json({ message: "User created"});
		}
	}
	catch (error) {
		console.log(error);
		next(error);
	}
}

exports.authenticateUser = async (req, res , next) => {
	try {
		let {Username, Password} = req.body;
		console.log(Username);
		console.log(Password);
		const [user, _] = await User.authenticate(Username, Password);
		console.log("user auth");

		if(!user || Object.keys(user).length == 0) {

			res.status(200).json({user: 'Fail'});
		}
		else if (Object.keys(user).length != 0) {
			res.status(200).json({user: 'Success'});
		}
		else {
			res.status(500).json({error: 'Failed user request'});
		}

	} 
	catch (error) {
		console.log(error);
		next(error);
	}
}

exports.getUserInfo = async (req, res, next) => {
	let { Username } = req.body;
	console.log(Username);

	try {
		const [rows, _] = await User.getInfo(Username);
		console.log("user getInfo", rows);

		// Assuming you're expecting one user or none
		if (rows.length > 0) {
			res.json(rows[0]); // Send the user data as JSON
		} else {
			res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		console.error("Error in getUserInfo:", error);
		res.status(500).json({ message: "Internal server error" });
	}
}

exports.updateUser = async (req, res, next) => {
	try {
		let {oldUsername, Password, name, date, licenseId, phoneNumber, email} = req.body;

		let user = new User(Username, Password, name, phoneNumber, licenseId, date, email);
	
		user = await user.update(oldUsername);
		let response = user.response;
		console.log("new user");
		if(response  == "User already exists") {
			res.status(201).json({ message: "User already exists"});
		}
		else {
			res.status(201).json({ message: "User created"});
		}
	}
	catch (error) {
		console.log(error);
		next(error);
	}
}
