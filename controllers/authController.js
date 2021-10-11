const actions = require('../actions/authActions')

exports.loginUser = (req, res) => {
	const datas = req.body
	actions.loginUser(datas, res)
}

exports.logoutUser = (req, res) => {
	const { userId } = req.params
	actions.logoutUser(userId, res)
}