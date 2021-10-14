const actions = require('../actions/channelActions')

exports.createChannel = (req, res) => {
	const { userId } = req.params
	const { ownerId, datas } = req.body

	if (userId === ownerId) actions.createChannel(ownerId, datas, res)
	else res.status(403).send('not authorized')
}

exports.getAllChannels = (req, res) => {
	const params = req.body
	actions.getAllChannels(params, res)
}

exports.getChannelById = (req, res) => {
	const { channelId } = req.params
	actions.getChannelById(channelId, res)
}

exports.getChannelByUrl = (req, res) => {
	const { channelUrl } = req.params
	actions.getChannelByUrl(channelUrl, res)
}