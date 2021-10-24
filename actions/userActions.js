const dataService = require('../services/dataService')

class userActions {

	log(target) { 
		const isActive = true
		if (isActive) console.log(`---- ${target} ----`) 
	}

	handleError(err, res, status = 500) { 
		this.log(`ERROR ${status}`)
		
		if (err) this.log(err)
		let error = ''

		switch (status) {
			case 409:
				error = 'Email déjà utilisé'
				break
			
			default:
			case 500:
				error = 'Une erreur est survenue'
				break
		}

		return res 
		? res.status(status).send(error) 
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
		} catch(err) { this.handleError(err, res) }
	}

	async createUser(datas, res) {
		this.log('CREATE USER')
		try {
			const dup = await dataService.getUserByEmail(datas.email)

			if (!dup) var user = await dataService.createUser(datas)
			else return this.handleError(null, res, 409)
			
			res.status(200).send(user)
		} catch(err) { this.handleError(err, res) }
	}

	async updateUserById(userId, changes, res) {
		this.log('UPDATE USER')
		try {
			const user = await dataService.updateUserById(userId, changes)
			// if (!user) this.handleError('', res)


			res.status(200).send(user)
		} catch(err) { this.handleError(err, res) }
	}

	async updateUserChannelSub(userId, channelId, act, res) {

		this.log('UPDATE USER SUB')
		const isActive = true
		try {
			// console.log(userId)
			var user = await dataService.getUserById(userId)
			var channel = await dataService.getChannelById(channelId)

			const action = !user.subs.some(c => c.channel._id == channelId)
			console.log(action)

			if (!isActive) {
				// console.log(user)
				let datas = {
					subs: user.subs.length,
					chan: channel.members.length
				}
				console.table(datas)
			}

			//#region --------------- CHANNEL ACTIONS
			this.log('--- CHANNEL ---')
			if (action) {
				let newMember = {
					user: userId,
					role: 'none',
					isBanned: false,
				}
				channel.members.push(newMember)
			} else {
				channel.members.forEach((s, i) => {
					if (s.user._id == userId) channel.members.splice(i, 1)
				})
			}
			//#endregion

			//#region --------------- USER ACTIONS
			this.log('--- USER ---')
			if (action) {
				let newSub = {
					channel: channelId,
					since: new Date(),
					rank: 0
				}
				user.subs.push(newSub)
			} else {
				user.subs.forEach((s, i) => {
					if (s.channel._id == channelId) user.subs.splice(i, 1)
				})
			}
			//#endregion

			if (isActive) {
				await user.save()
				await channel.save()
			}

			res.status(200).send(user)

		} catch(err) { this.handleError(err, res) }
	}

	async deactivateUser(userId, res) {
		this.log('BAN USER')
		try {
			const user = await dataService.getUserById(userId)

			user.posts.forEach(p => {
				p.setInactive()
			})

			user.channels.forEach(c => {
				c.setInactive()
			})

			user.events.forEach(e => {
				e.setInactive()
			})

			user.isActive = false

			await user.save()
			res.status(200).send(user)
		} catch(err) { this.handleError(err, res) }
	}

	async banUser(userId, banReason, res) {
		this.log('BAN USER')
		try {
			const user = await dataService.getUserById(userId)

			user.posts.forEach(p => {
				p.setInactive()
			})

			user.channels.forEach(c => {
				c.setInactive()
			})

			user.events.forEach(e => {
				e.setInactive()
			})

			user.isActive = false
			user.isBan = true
			user.banReason = banReason
			user.desc = 'J\'ai été banni, huez moi'

			await user.save()
			res.status(200).send(user)
		} catch(err) { this.handleError(err, res) }
	}
}	

module.exports = new userActions()