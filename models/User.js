const db = require('../config/db');

class User {
	constructor(user, password, name, phoneNumber, licenseId, date) {
		this.user = user;
		this.password = password;
		this.name = name;
		this.phoneNumber = phoneNumber;
		this.licenseId = licenseId;
		this.date = date;
	}

	async save() {
		let checkDup = `SELECT COUNT(*) as count FROM user WHERE Username = '${this.user}'`;
		const [result] = await db.execute(checkDup);
		
		if (result[0].count > 0) {
			return{response: 'User already exists'};
		}

		let insertSql = `INSERT INTO user (Username, Password, Date_of_birth, Phone_number, Full_name, License_id) 
		VALUES ('${this.user}' , '${this.password}',  '${this.date}', '${this.phoneNumber}','${this.name}','${this.licenseId}')`;

		const newUser = await db.execute(insertSql);

		return {response: 'User created'};
	}

	static authenticate(username, password) {
		let sql = `Select * from user where Username = '${username}' and Password = '${password}'`;

		return db.execute(sql);
	}
}

module.exports = User;