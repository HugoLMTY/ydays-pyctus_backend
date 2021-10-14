const actions = require('../actions/canvaActions')

exports.createCanva = (req, res) => {
	const { userId } = req.params
	const { ownerId, datas} = req.body

	if (userId === ownerId) actions.createCanva(userId, datas, res)
	else res.status(403).send('unauthorized')
}

exports.createChildCanva = (req, res) => {
	const { userId } = req.params
	const { ownerId, parentId, datas } = req.body

	if (userId === ownerId) actions.createChildCanva(userId, parentId, datas, res)
	else res.status(403).send('unauthorized')
}