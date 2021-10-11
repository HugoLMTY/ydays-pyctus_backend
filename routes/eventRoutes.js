const express = require('express')
const router = express.Router()

const eventController = require('../controllers/eventController')

router.route('/all')
	.get(eventController.getAllEvents)
	.post(eventController.getAllEvents)

router.route('/create/:userId')
	.post(eventController.createEvent)

router.route('/owner/:userId')
	.get(eventController.getEventsByOwnerId)

router.route('/update/owner/:userId')
	.post(eventController.updateEventsByOwnerId)

router.route('/update/:eventId')
	.post(eventController.updateEventById)

router.route('/:eventId')
	.get(eventController.getEventById)


module.exports = router