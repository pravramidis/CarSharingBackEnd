const User = require('../models/User');

exports.createUser = async (req, res, next) => {
	try {
		let {Username, Password} = req.body;
		let user = new User(Username, Password);
	
		user = await user.save();
		let response = user.response;
		if(response  == "User already exists") {
			res.status(401).json({ message: "User already exists"});
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