const actions = require('../actions/eventActions')

exports.createEvent = (req, res) => {
	const { userId } = req.params
	const { ownerId, datas } = req.body

	if (userId === ownerId) actions.createEvent(ownerId, datas, res)
	else res.status(403).send('unauthorized')
}

exports.getAllEvents = (req, res) => {
	const params = req.body
	actions.getAllEvents(params, res)
}

exports.getEventById = (req, res) => {
	const { eventId } = req.params
	actions.getEventById(eventId, res)
}

exports.getEventsByOwnerId = (req, res) => {
	const { userId } = req.params
	actions.getEventsByOwnerId(userId, res)
}

exports.updateEventById = (req, res) => {
	const { eventId } = req.params
	const { changes } = req.body
	actions.updateEventById(eventId, changes, res)
}

exports.updateEventsByOwnerId = (req, res) => {
	const { userId } = req.params
	const { ownerId, changes } = req.body
	
	if (userId === ownerId) actions.updateEventsByOwnerId(ownerId, changes, res)
	else res.status(403).send('unauthorized')
}