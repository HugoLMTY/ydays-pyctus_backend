const User = require('../models/userModel')

const populateFields = "posts friends follows events"

class dataService {

	handleError(err) { 
		const isActive = true
		if (isActive) console.log(err) 
	}

	//#region ------------ USER 
		//#region ------------ CREATE

		createUser(datas) {
			const {
				firstName,
				lastName,
				email,
				password,
			} = datas

			try {

			} catch(err) { this.handleError(err) }
			const newUser = new User({
				firstName,
				lastName,
				email,
				password
			})

			return newUser.save()
		}

		//#endregion

		//#region ------------ GET

		getAllUsers(params = {}) {
			const query = User
				.find(params)
				.populate(populateFields)
				.exec()

			return query
		}

		getUserById(id) {
			const query = User
				.findById(id)
				.populate(populateFields)
				.exec()

			return query
		}

		getUserByEmail(email) {
			const query = User
				.find({ email })
				.populate(populateFields)
				.exec()

			return query
		}

		// #endregion

		//#region ------------ UPDATE

		updateUserById(id, changes) {
			return User.findByIdAndUpdate(id, changes)
		}

		//#endregion
	//#endregion
}


module.exports = new dataService()