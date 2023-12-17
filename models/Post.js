const db = require('../config/db');

class User {
	constructor(user, password) {
		this.user = user;
		this.password = password;
	}

	save() {

		let sql = `INSERT INTO user (Username, Password) VALUES ('${this.user}' , '${this.password}' )`;

		const newUser = db.execute(sql);

		return newUser;
	}

	static authenticate(username, password) {
		let sql = `Select * from user where Username = '${username}' and Password = '${password}'`;

		return db.execute(sql);
	}
}

module.exports = User;