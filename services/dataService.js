const User = require('../models/userModel')
const Post = require('../models/postModel')

const populateUser = "posts friends follows events"
const populatePost = "author target comments reactions"

const bcrypt = require('bcrypt')

class dataService {

	handleError(err) { 
		const isActive = true
		if (isActive) console.log(err) 
	}

	//#region ------------ USER 
		//#region ------------ CREATE
		async createUser(datas) {
			const {
				firstName,
				lastName,
				email,
				password,
			} = datas

			var $pwd = bcrypt.hash(password, 10) 

			try {
				const newUser = new User({
					firstName,
					lastName,
					email,
					$pwd,
				})

				const user = await newUser.save()
				return user
			} catch(err) { this.handleError(err) }
		}
		//#endregion

		//#region ------------ GET
		async getAllUsers(params = {}, populated = true) {
			let fields = populated ? populatePost : {}
			
			const query = await User
				.find(params)
				.populate(fields)
				.exec()

			return query
		}

		async getUserById(id, populated = true) {
			let fields = populated ? populatePost : {}
			
			const query = await User
				.findById(id)
				.populate(fields)
				.exec()

			return query
		}

		async getUserByEmail(email, populated = true) {
			let fields = populated ? populatePost : {}
			
			const query = await User
				.find({ email })
				.populate(fields)
				.exec()

			return query
		}
		// #endregion

		//#region ------------ UPDATE
		async updateUserById(id, changes) {
			return await User.findByIdAndUpdate(id, changes)
		}
		//#endregion
	//#endregion


	//#region ------------ POST
		//#region CREATE
		async createPost(userId, datas) {
			const {
				title,
				content,

				hasImages,
				images,

				postAs,

				target,

				allowComments,
				allowReactions
			} = datas

			try {
				const newPost = new Post({
					author: '61606061904cd5dd814d32b7',
					// author: userId,

					isActive: true,

					title,
					content,
					
					hasImages,
					images,

					postAs,

					target,

					allowComments,
					comments: [],

					allowReactions,
					reactions: []
				})

				const post = await newPost.save()
				return post
			} catch(err) { this.handleError(err) }
		}
		//#endregion

		//#region GET
		async getAllPosts(params, populated = true) {
			let fields = populated ? populatePost : {}

			const query = await Post
				.find(params)
				.populate(fields)
				.exec()

			return query
		}

		async getPostById(postId, populated = true) {
			let fields = populated ? populatePost : {}

			const query = await Post
				.findById(postId)
				.populate(fields)
				.exec()

			return query
		}

		async getPostsByAuthorId(authorId) {
			const query = await Post
				.find({ author: authorId})
				.populate(populatePost)
				.exec()

			return query
		}
		//#endregion

		//#region UPDATE
		async updatePostById(postId, changes, populated = true) {
			let fields = populated ? populatePost : {}

			const query = await Post
				.findByIdAndUpdate(postId, changes)
				.populate(fields)
				.exec()

			return query
		}

		async updatePostsByAuthorId(authorId, changes) {
			const query = await Post
				.updateMany({ author: authorId }, changes)
				.populate(populatePost)
				.exec()

			return query
		}
		//#endregion
	//#endregion


	//#region ------------ TYPE
		//#region CREATE
		//#endregion

		//#region GET
		//#endregion

		//#region UPDATE
		//#endregion
	//#endregion
}


module.exports = new dataService()