const dataService = require('../../services/dataService')
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

class friendsAction {

	log(target) { 
		const isActive = true
		if (isActive) console.log(`---- ${target} ----`) 
	}

	handleError(err, res, status = 500) { 
		this.log(`ERROR ${status}`)
		
		if (err) console.log(err)
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


	async getPotentialFriendsByUserId(userId, limit = 10, res) {
		this.log('GET POTENTIAL FRIENDS BY USER ID')
		try {
			const query = { 
				isActive: true, 
		
				_id: { $ne: userId },
		
				// "friends.accepted": { $nin: [ userId ] },
				// "friends.received": { $nin: [ userId ] },
				// "friends.sent": 	{ $nin: [ userId ] },
			}
			const userList = await dataService.getAllUsers(query)

			if (userList.length > limit) userList.length = limit
			
			return res.status(200).send(userList)
		} catch(err) { this.handleError(err, res) }
	}

	async sendFriendRequest(userId, targetId, res) {
		this.log('SEND FRIEND REQUEST')
		try {
			const user 	 = await dataService.getUserById(userId)
			const target = await dataService.getUserById(targetId)
			
			const uIndex = user.friends.sent
				.map(function(s) { return s._id.toString() || s })
				.indexOf(targetId)

			const tIndex = target.friends.received
				.map(function(r) { return r._id.toString() || r })
				.indexOf(userId)

			if (uIndex == -1 && tIndex == -1) {

				user.friends.sent.push(targetId)
				target.friends.received.push(userId)

			} else {

				if (uIndex !== -1 && tIndex == -1) user.friends.sent.push(targetId)
				if (uIndex == -1 && tIndex !== -1) target.friends.received.push(userId)

			}

			target.save()
			await user.save()

			res.status(200).send(user)
		} catch(err) { this.handleError(err, res) }
	}

	async answerFriendRequest(userId, targetId, action, res) {
		this.log(`ANSWER FRIEND REQUEST (${action})`)
		try {
			const user 	 = await dataService.getUserById(userId)
			const target = await dataService.getUserById(targetId)

			const uIndex = user.friends.received
				.map(function(r) { return r._id.toString() || r })
				.indexOf(targetId)

			const tIndex = target.friends.sent
				.map(function(s) { return s._id.toString() || s })
				.indexOf(userId)
			

			if (action != null && uIndex !== -1 && tIndex !== -1) {

				console.log('do')

				user.friends.received.splice(tIndex, 1)
				user.friends.accepted.push(targetId)
				
				target.friends.sent.splice(tIndex, 1)
				target.friends.accepted.push(userId)

			} else {

				console.log('dont ')
				
				if (uIndex !== -1) user.friends.received.splice(uIndex, 1)
				if (tIndex !== -1) target.friends.sent.splice(tIndex, 1)
				
			}

			target.save()
			await user.save()

			res.status(200).send(user)

		} catch(err) { this.handleError(err, res) }
	}

	async cancelFriendRequest(userId, targetId, res) {
		this.log('CANCEL FRIEND REQUEST')
		try {
			const user   = await dataService.getUserById(userId)
			const target = await dataService.getUserById(targetId)

			const uIndex = user.friends.sent
				.map(function(s) { return s._id.toString() || s })
				.indexOf(targetId)

			const tIndex = target.friends.received
				.map(function(r) { return r._id.toString() || r })
				.indexOf(userId)

			if (uIndex == -1 && tIndex == -1) {

				user.friends.sent.splice(uIndex, 1)
				target.friends.received.splice(tIndex, 1)

			} else {

				if (tIndex !== -1) target.friends.received.splice(tIndex, 1)
				if (uIndex !== -1) user.friends.sent.splice(uIndex, 1)

			}
			
			target.save()
			await user.save()

			res.status(200).send(user)
		} catch(err) { this.handleError(err, res) }
	}

	async removeFriend(userId, targetId, res) {
		this.log('REMOVE FRIEND')
		try {
			const user = await dataService.getUserById(userId)
			const target = await dataService.getUserById(targetId)

			const uIndex = user.friends.accepted
				.map(function(a) { return a._id.toString() || a })
				.indexOf(targetId)

			const tIndex = target.friends.accepted
				.map(function(a) { return a._id.toString() || a })
				.indexOf(userId)

			if (uIndex !== -1 && tIndex !== -1) {

				user.friends.accepted.splice(uIndex, 1)
				target.friends.accepted.splice(tIndex, 1)

			} else {

				if (tIndex == -1) user.friends.accepted.splice(uIndex, 1)
				if (uIndex == -1) target.friends.accepted.splice(tIndex, 1)

			}

			target.save()
			await user.save()

			res.status(200).send(user)
		} catch(err) { this.handleError(err, res) }
	}
}

module.exports = new friendsAction()