const db = require('../config/db');

class User {
	constructor(user, password, name, phoneNumber, licenseId, date, email) {
		this.user = user;
		this.password = password;
		this.name = name;
		this.phoneNumber = phoneNumber;
		this.licenseId = licenseId;
		this.date = date;
		this.email = email;
	}

	async save() {
		let checkDup = `SELECT COUNT(*) as count FROM user WHERE Username = '${this.user}'`;
		const [result] = await db.execute(checkDup);
		
		if (result[0].count > 0) {
			return{response: 'User already exists'};
		}

		let insertSql = `INSERT INTO user (Username, Password, Date_of_birth, Phone_number, Full_name, License_id, Email) 
		VALUES ('${this.user}' , '${this.password}',  '${this.date}', '${this.phoneNumber}','${this.name}','${this.licenseId}', '${this.email}')`;

		const newUser = await db.execute(insertSql);

		return {response: 'User created'};
	}

	static authenticate(username, password) {
		let sql = `Select * from user where Username = '${username}' and Password = '${password}'`;

		return db.execute(sql);
	}

	static getInfo(username) {
		let sql = `Select * from user where Username = '${username}'`;

		return db.execute(sql,[username]);
	}

	async update(oldUsername) {
		let checkDup = `SELECT COUNT(*) as count FROM user WHERE Username = '${this.user}'`;
		const [result] = await db.execute(checkDup);
		
		if (result[0].count > 0 && oldUsername != this.user) {
			return{response: 'User already exists'};
		}

		let updateSql = `UPDATE user 
						 SET (Username = '${this.user}' , Password = '${this.password}',  Date_of_birth = '${this.date}', Phone_number = '${this.phoneNumber}',
						 	 Full_Name = '${this.name}', License_id ='${this.licenseId}', Email = '${this.email}')
						 WHERE Username = '${oldUsername}'`;

		const newUser = await db.execute(updateSql);

		return {response: 'User updated'};
	}
}

module.exports = User;