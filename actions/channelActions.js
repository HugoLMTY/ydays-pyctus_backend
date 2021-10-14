const dataService = require('../services/dataService')

class channelActions {

	log(target) {
		const isActive = true
		if (isActive) {
			switch (typeof target) {

				case 'object':
					console.log(target)
					break

				case 'string':
				default:
					console.log(`---- ${target} ----`)
					break
			}
		}
	}
	
	handleError(err, res) { 
		console.log(err); 
	
		return res 
		? res.status(500).send(err) 
		: null
	}

	async createChannel(ownerId, datas, res) {
		this.log('CREATE CHANNEL')
		try {
			const user = await dataService.getUserById(ownerId)
			const channel = await dataService.createChannel(ownerId, datas)

			user.channels.push(channel)
			await user.save()

			res.status(200).send(channel)
		} catch(err) { this.handleError(err, res) }
	}

	async getAllChannels(params = {}, res) {
		this.log('GET ALL CHANNELS')
		try {
			const channelList = await dataService.getAllChannels(params)

			res.status(200).send(channelList)
		} catch(err) { this.handleError(err, res) }
	}

	async getChannelById(id, res) {
		this.log('GET CHANNEL BY ID')
		try {
			const channel = await dataService.getChannelById(id)

			res.status(200).send(channel)
		} catch(err) { this.handleError(err, res) }
	}

	async getChannelByUrl(url, res) {
		this.log('GET CHANNEL BY URL')
		try {
			const channel = await dataService.getChannelByUrl(url)

			res.status(200).send(channel)
		} catch(err) { this.handleError(err, res) }
	}
}

module.exports = new channelActions()