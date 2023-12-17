const User = require('../models/Post');

exports.createUser = async (req, res, next) => {
	try {
		let {Username, Password} = req.body;
		let user = new User(Username, Password);
	
		user = await user.save();
		
		res.status(201).json({ message: "User created"});
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

		console.log(user[0]);

		res.status(200).json({user: user[0]});
	} 
	catch (error) {
		console.log(error);
		next(error);
	}
}