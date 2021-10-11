const User 		= require('../models/userModel')
const Post 		= require('../models/postModel')
const Channel 	= require('../models/channelModel')
const Event 	= require('../models/eventModel')

const populateUser = `posts.post channels friends.sent friends.received friends.accepted follows.following.user follows.followed.user`
const populatePost = `author target.group target.channel comments.users comments.reactions.user reactions.user`
const populateEvent = `owner participants.user`
const populateChannel = `author admins.user admins.from members.user posts.post`

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

			var $pwd = await bcrypt.hash(password, 10)

			try {
				const newUser = new User({
					firstName,
					lastName,
					email,
					password: $pwd,
				})

				const user = await newUser.save()
				return user
			} catch(err) { this.handleError(err) }
		}
		//#endregion

		//#region ------------ GET
		async getAllUsers(params = {}, populated = true) {
			const query = User.find(params)

			return !populated ? query : query
				.populate(populateUser)
				.exec()
		}

		getUserById(id, populated = true) {
			const query = User.findById(id)

			return !populated ? query : query
				.populate(populateUser)
				.exec()

		}

		async getUserByEmail(email, populated = true) {
			const query = User.findOne({ email })

			return !populated ? query : query
				.populate(populateUser)
				.exec()
		}
		// #endregion

		//#region ------------ UPDATE
		async updateUserById(id, changes, populated = true) {
			const query = await User.findByIdAndUpdate(id, changes)

			return !populated ? query : query
				.populate(populateUser) 
				.exec()
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
					// author: '61606061904cd5dd814d32b7',
					author: userId,

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
			const query = await Post.find(params)

			return !populated ? query : query
				.populate(fields)
				.exec()
		}

		async getPostById(postId, populated = true) {
			const query = await Post.findById(postId)

			return !populated ? query : query
				.populate(fields)
				.exec()

		}

		async getPostsByAuthorId(authorId, populated = true) {
			const query = await Post.find({ author: authorId})
				
				return !populated ? query : query
					.populate(populatePost)
					.exec()
		}
		//#endregion

		//#region UPDATE
		async updatePostById(postId, changes, populated = true) {

			const query = await Post.findByIdAndUpdate(postId, changes)

			return !populated ? query : query
				.populate(populatePost)
				.exec()
		}

		async updatePostsByAuthorId(authorId, changes, populated = true) {
			const query = await Post.updateMany({ author: authorId }, changes)

			return !populated ? query : query
				.populate(populatePost)
				.exec()
		}
		//#endregion
	//#endregion


	//#region ------------ CHANNEL
		//#region CREATE
		async createChannel(userId, datas) {
			const {
				title,
				desc,
				icon
			} = datas

			try {
				const newChannel = new Channel({
					title,
					desc,
					icon,

					owner: userId,
					createdAt: new Date(),

					admins: [],

					members: [{
						user: userId,
						role: 'admin'
					}]
				})

				const channel = await newChannel.save()
				return channel
			} catch(err) { this.handleError(err) }

		}
		//#endregion

		//#region GET
		async getAllChannels(params = {}, populated = true) {
			const query = Channel.find(params)

			return !populated ? query : query 
			.populate(populateChannel)
			.exec()
		}

		async getChannelById(channelId, populated = true) {
			const query = Channel.findById(channelId)

			return !populated ? query : query 
			.populate(populateChannel)
			.exec()
		}

		async getChannelsByOwnerId(ownerId, populated = true) {
			const query = Channel.find({ owner: ownerId })

			return !populated ? query : query 
			.populate(populateChannel)
			.exec()
		}
		//#endregion

		//#region UPDATE
		async updateChannelById(channelId, changes, populated = true) {
			const query = Channel.findByIdAndUpdate(channelId, changes)

			return !populated ? query : query
				.populate(populateChannel)
				.exec()
		}

		async updateChannelsByOwnerId(ownerId, changes, populated = true) {
			const query = Channel.updateMany({ owner: ownerId }, changes)

			return !populated ? query : query
				.populate(populateChannel)
				.exec()
		}
		//#endregion
	//#endregion


	//#region ------------ EVENTS
		//#region CREATE
		async createEvent(ownerId, datas) {
			const {
				title,
				desc,

				type,
				location,

				openAt,
				closeAt,

				startAt,
				endAt,

				offers
			} = datas

			try {
				const newEvent = new Event({
					title,
					desc,

					type,
					location,

					owner: ownerId,

					openAt,
					closeAt,

					startAt,
					endAt,

					offers
				})

				const event = await newEvent.save()
				return event
			} catch(err) { this.handleError(err) }
		}
		//#endregion

		//#region GET
		async getAllEvents(params = {}, populated = true) {
			const query = Event.find(params)

			return !populated ? query : query
				.populate(populateEvent)
				.exec()
		}

		async getEventById(eventId, populated = true) {
			const query = Event.findById(eventId)

			return !populated ? query : query
				.populate(populateEvent)
				.exec()
		}

		async getEventsByOwnerId(ownerId, populated = true) {
			const query = Event.find({ owner: ownerId })

			return !populated ? query : query
				.populate(populateEvent)
				.exec()
		}
		//#endregion

		//#region UPDATE
		async updateEventById(eventId, changes, populated = true) {
			const query = await Event.findByIdAndUpdate(eventId, changes)

			return !populated ? query : query
				.populate(populateEvent)
				.exec()
		}

		async updateEventsByOwnerId(ownerId, changes, populated = true) {
			const query = await Event.updateMany({ owner: ownerId}, changes)

			return !populated ? query : query
				.populate(populateEvent)
				.exec()
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