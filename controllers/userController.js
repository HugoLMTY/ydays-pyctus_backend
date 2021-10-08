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
	actions.getUesrByEmail(email, res)
}