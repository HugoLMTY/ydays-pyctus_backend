const dataService = require("../services/dataService");

class eventActions {

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

	async createEvent(ownerId, datas, res) {
		this.log('CREATE EVENT')
		try {
			const user = await dataService.getUserById(ownerId)
			const event = await dataService.createEvent(ownerId, datas)

			let newEvent = {
				event,
				isOwner: true
			}
			user.events.push(newEvent)
			user.save()

			res.status(200).send(event)
		} catch(err) { this.handleError(err, res) }
	}

	async getAllEvents(params = {}, res) {
		this.log('GET ALL EVENTS')
		try {
			const eventList = await dataService.getAllEvents(params)

			res.status(200).send(eventList)
		} catch(err) { this.handleError(err, res) }
	}
	
	async getEventById(eventId, res) {
		this.log('GET EVENT BY ID')
		try {
			const event = await dataService.getEventById(eventId)

			res.status(200).send(event)
		} catch(err) { this.handleError(err, res) }
	}

	async getEventsByOwnerId(ownerId, res) {
		this.log('GET EVENTS BY OWNER ID')
		try {
			const eventList = await dataService.getEventsByOwnerId(ownerId)

			res.status(200).send(eventList)
		} catch(err) { this.handleError(err, res) }
	}

	async updateEventById(eventId, changes, res) {
		this.log('UPDATE POST BY ID')
		try {
			const event = await dataService.updateEventById(eventId, changes)

			res.status(200).send(event)
		} catch(err) { this.handleError(err, res) }
	}

	async updateEventsByOwnerId(ownerId, changes, res) {
		this.log('UPDATE EVENTS BY OWNER ID')
		try {
			const eventList = await dataService.updateEventsByOwnerId(ownerId, changes)

			res.status(200).send(eventList)
		} catch(err) { this.handleError(err, res) }
	}
}

module.exports = new eventActions()