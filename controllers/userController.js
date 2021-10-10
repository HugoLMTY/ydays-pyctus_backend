const actions = require('../actions/userActions')

exports.getAllUsers = (req, res) => {
	const params = req.body
	actions.getAllUser(params, res)
}

exports.getUserById = (req, res) => {
	const { userId } = req.params
	actions.getUserById(userId, res)
}

exports.getUserByEmail = (req, res) => {
	const { email } = req.body
	actions.getUserByEmail(email, res)
}

exports.createUser = (req, res) => {
	const datas = req.body
	actions.createUser(datas, res)
}

exports.updateUserById = (req, res) => {
	const { userId } = req.params
	const changes = req.body
	actions.updateUserById(userId, changes, res)
}