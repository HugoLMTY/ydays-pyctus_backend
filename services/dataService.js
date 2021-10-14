const User 		= require('../models/userModel')
const Post 		= require('../models/postModel')
const Channel 	= require('../models/channelModel')
const Event 	= require('../models/eventModel')
const Canva 	= require('../models/canvaModel')

const populateUser 		= `posts.post channels friends.sent friends.received friends.accepted follows.following.user follows.followed.user canvas.canva`

const populatePost 		= `author comments.users comments.reactions.user reactions.user`

const populateEvent 	= `owner participants.user`

const populateChannel 	= `owner admins.user admins.from members.user posts`
const deepPopulateChannel = {
	path: 'posts',
	populate: [{
		path: 'author'
	}]
}
const populateCanva		= `child parent`

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
		getAllUsers(params = {}, populated = true) {
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

		getUserByEmail(email, populated = true) {
			const query = User.findOne({ email })

			return !populated ? query : query
				.populate(populateUser)
				.exec()
		}
		// #endregion

		//#region ------------ UPDATE
		 updateUserById(id, changes, populated = true) {
			const query = User.findByIdAndUpdate(id, changes)

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
		getAllPosts(params = {}, populated = true) {
			const query = Post.find(params)

			return !populated ? query : query
				.populate("author")
				.exec()
		}

		getPostById(postId, populated = true) {
			const query = Post.findById(postId)

			// console.log(query)

			return !populated ? query : query
				.populate("author")
				.exec()

		}

		getPostsByAuthorId(authorId, populated = true) {
			const query = Post.find({ author: authorId})
				
				return !populated ? query : query
					.populate(populatePost)
					.exec()
		}
		//#endregion

		//#region UPDATE
		updatePostById(postId, changes, populated = true) {

			const query = Post.findByIdAndUpdate(postId, changes)

			return !populated ? query : query
				.populate(populatePost)
				.exec()
		}

		updatePostsByAuthorId(authorId, changes, populated = true) {
			const query = Post.updateMany({ author: authorId }, changes)

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

		async getChannelByUrl(channelUrl, populated = true) {
			const query = Channel.findOne({ url: channelUrl })

			return !populated ? query : query
				.populate(populateChannel)
				.populate(deepPopulateChannel)
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
		getAllEvents(params = {}, populated = true) {
			const query = Event.find(params)

			return !populated ? query : query
				.populate(populateEvent)
				.exec()
		}

		getEventById(eventId, populated = true) {
			const query = Event.findById(eventId)

			return !populated ? query : query
				.populate(populateEvent)
				.exec()
		}

		getEventsByOwnerId(ownerId, populated = true) {
			const query = Event.find({ owner: ownerId })

			return !populated ? query : query
				.populate(populateEvent)
				.exec()
		}
		//#endregion

		//#region UPDATE
		updateEventById(eventId, changes, populated = true) {
			const query = Event.findByIdAndUpdate(eventId, changes)

			return !populated ? query : query
				.populate(populateEvent)
				.exec()
		}

		updateEventsByOwnerId(ownerId, changes, populated = true) {
			const query = Event.updateMany({ owner: ownerId}, changes)

			return !populated ? query : query
				.populate(populateEvent)
				.exec()
		}
		//#endregion
	//#endregion

	//#region ------------ CANVA
		//#region CREATE
		async createCanva(userId, datas) {
			const {
				title,
				content,
			} = datas

			let colors = [
				'red',
				'blue',
				'green',
				'purple',
				'yellow',
				'pink',
				'brown',
				'cyan',
				'turquoise',
				'orange'
			]

			const index = Math.floor(Math.random() * (colors.length - 0) + 0)

			let color = colors[index]

			try {
				const newCanva = new Canva({
					title,
					content,

					owner: userId,
					
					color,

					posX: 10,
					posY: 10,

					height: 150,
					width: 150,
				})

				const canva = await newCanva.save()
				return canva

			} catch(err) { this.handleError(err) }
		}
		//#endregion

		//#region GET
		getCanvaById(canvaId, populate = true) {
			const query = Canva.findById(canvaId)

			return !populate ? query : query
				.populate(populateCanva)
				.exec()
		}
		//#endregion

		//#region UPDATE
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