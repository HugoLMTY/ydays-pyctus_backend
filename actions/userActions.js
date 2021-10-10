const dataService = require('../services/dataService')

class userActions {

	log(target) { 
		const isActive = true
		if (isActive) console.log(`---- ${target} ----`) 
	}

	handleError(err, res) { 
		console.log(err); 

		return res 
		? res.status(500).send(err) 
		: null
	}

	async getAllUser(params = {}, res) {
		this.log('GET ALL USERS')
		try {
			const userList = await dataService.getAllUsers(params)

			res.status(200).send(userList)
		} catch(err) { this.handleError(err, res) }
	}

	async getUserById(id, res) {
		this.log('GET USER BY ID')
		try {
			const user = await dataService.getUserById(id)

			res.status(200).send(user)
		} catch(err) { this.handleError(err, res) }
	}

	async getUserByEmail(email, res) {
		this.log('GET USER BY EMAIL')
		try {
			const user = await dataService.getUserByEmail(email)

			res.status(200).send(user)
		} catch(err) { this.handleErrp(err, res) }
	}

	async createUser(datas, res) {
		this.log('CREATE USER')
		try {
			const user = await dataService.createUser(datas)

			res.status(200).send(user)
		} catch(err) { this.handleErrp(err, res) }
	}

	async updateUserById(userId, changes, res) {
		this.log('UPDATE USER')
		try {
			const user = await dataService.updateUserById(userId, changes)

			res.status(200).send(user)
		} catch(err) { this.handleErrp(err, res) }
	}
}	

module.exports = new userActions()