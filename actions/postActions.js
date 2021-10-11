const dataService = require('../services/dataService')

class postActions {

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

	async createPost(userId, datas, res) {
		this.log('CREATE POST')
		try {
			const user = await dataService.getUserById(userId)
			const post = await dataService.createPost(userId, datas)


			let newPost = {
				post,
				postedAt: new Date(),
				isShared: false,
			}
			user.posts.push(newPost)
			await user.save()

			res.status(200).send(post)			
		} catch(err) { this.handleError(err, res) }
	}
	
	async getAllPosts(params = {}, res) {
		this.log('GET ALL POSTS')
		try {
			const postList = await dataService.getAllPosts(params)

			res.status(200).send(postList)
		} catch(err) { this.handleError(err, res) }
	}

	async getPostById(id, res) {
		this.log('GET POST BY ID')
		try {
			const post = await dataService.getPostById(id)

			res.status(200).send(post)
		} catch(err) { this.handleError(err, res) }
	}

	async getPostsByAuthorId(authorId, res) {
		this.log('GET POSTS BY AUTHOR ID')
		try {
			const postList = await dataService.getPostsByAuthorId(authorId)

			res.status(200).send(postList)
		} catch(err) { this.handleError(err, res) }
	}

	async updatePostById(postId, changes, res) {
		this.log('UPDATE POST BY ID')
		try {
			const post = await dataService.updatePostById(postId, changes)

			res.status(200).send(post)
		} catch(err) { this.handleError(err, res) }
	}

	async updatePostsByAuhtorId(authorId, changes, res) {
		this.log('UPDATE POSTS BY AUTHOR ID')
		try {
			const postList = await dataService.updatePostsByAuthorId(authorId, changes)

			res.status(200).send(postList)
		} catch(err) { this.handleError(err, res) }
	}
}

module.exports = new postActions()