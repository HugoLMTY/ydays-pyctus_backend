const dataService = require('../../services/dataService')
const Post = require('../../models/postModel')

class postActions {

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

	

	async toggleLikedPost(userId, postId, res) {
		this.log('TOGGLE LIKED POST')
		try {
			const user = await dataService.getUserById(userId, false)
			const post = await dataService.getPostById(postId, false)

			var userIndex = user.posts
			? user.posts.liked
				.map(function(p) { return p.post.toString()})
				.indexOf(postId)
			: -1

			var postIndex = post.reactions
			? post.reactions
				.map(function(u) { return u.user.toString()})
				.indexOf(userId)
			: -1


			if (userIndex != -1 && postIndex != -1) {
				// INDEX EXIST, LIKED
				this.log('--- LIKED, REMOVING ---')
				
				user.posts.liked.splice(userIndex, 1)
				post.reactions.splice(postIndex, 1)
				
			} else if (userIndex == -1 && postIndex == -1) {
				// INDEX === -1, NOT LIKED
				this.log('--- NOT LIKED, ADDING ---')

				let userData = {
					post: postId, 
					likedAt: new Date()
				}

				let postData = {
					user: userId,
					type: 'like'
				}

				user.posts.liked.push(userData)
				post.reactions.push(postData)

			} else {
				console.log('dissocied')
			}


			await user.save()
			await post.save()

			// console.log('user: ', user.posts.liked)
			// console.log('post: ', post.reactions)

			res.status(200).send(user)
		} catch(err) { this.handleError(err, res) }
	}

}

module.exports = new postActions()