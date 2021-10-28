const { createdCanva } = require("./dataService")
const dataService = require("./dataService")

const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const id = '61606061904cd5dd814d32b7' // HUGO LM
// const id = '61642327f869de112cff95e3' // NEW USER


//#region USER
async function countPosts() {
	const user = await dataService.getUserById(id)

	console.log(user.postCount())
}

async function countElements() {
	const user = await dataService.getUserById(id)

	console.log(user.countElements())
}

async function comparePwd($pwd) {
	const user = await dataService.getUserById(id)

	const pwd = await user.comparePassword($pwd)
	console.log(pwd)
}

async function toggleAdmin() {
	const user = await dataService.getUserById(id)

	console.log(user.toggleAdmin())
}

async function checkIsLiked(userId, postId) {
	const user = await dataService.getUserById(userId)
	const post = await dataService.getPostById(postId)
	
	// let found = false

	// for (let i = 0; i < user.posts.liked.length; i++) {
	// 	const p = user.posts.liked[i]
	// 	if (p.post == postId) found = true
	// }

	var indexU = user.posts.liked
		.map(function(p) { return p.post.toString() })
		.indexOf(postId)

	var indexP = post.reactions
		.map(function(u) { return u.user._id.toString() })
		.indexOf(userId)

	// console.log(indexU)

	console.log('p: ', indexP)
	console.log('u :', indexU)

	// post.reactions = [{user: userId, likedAt: new Date()}]
	// await post.save()
	// user.posts = {
	// 	created: [],
	// 	liked: [{post: postId, likedAt: new Date() }]
	// }
	// await user.save()
}

async function getFriendsList(userId, limit = 5) {
	const query = { 
		isActive: true, 

		_id: { $ne: userId },

		"friends.accepted": { $nin: [userId] },
		"friends.received": { $nin: [userId] },
		"friends.sent": 	{ $nin: [userId] },
	}

	const userList 	= await dataService.getAllUsers(query)

	if (userList.length > limit) userList.length = limit

	for (let i = 0; i < userList.length; i++) {
		const f = userList[i]

		console.log(f.firstName)
	}
}

async function checkAlreadyFriends(userId, targetId) {

	const user = await dataService.getUserById(userId)
	const uIndex = user.friends.sent
		.map(function(s) { return new ObjectId(s._id); })
		.indexOf(targetId.toString())

	console.log(uIndex)
}
// checkAlreadyFriends('61680818d1d6a3f40c42aadb', '61642327f869de112cff95e3')
//#endregion

//#region POST
async function lockPost(userId) {
	const postList = await dataService.getPostsByAuthorId(userId)
	const post = postList[0]

	console.log(post.toggleLock())
}

async function toggleActivePost(userId) {
	const postList = await dataService.getPostsByAuthorId(userId)
	const post = postList[0]

	console.log(post.toggleActive())
}

async function getPostScore(postId) {
	const post = await dataService.getPostById(postId)
	let score = 0

	let dateMult 		= 0.5
	let commentMult		= 1
	let reactionMult 	= 1

	const datePoint = (new Date().getTime() - new Date(post.postedAt).getTime()) / 3600 / 60 / 24
	const reactionPoint = post.reactions.length
	const commentPoint = post.comments.length

	score = ( (datePoint * dateMult) + (reactionPoint * reactionMult) + (commentPoint * commentMult)) / 3
	
	console.log(score)
}

async function getPostTimeAgo(postId) {
	const post = await dataService.getPostById(postId)

	let date = new Date().getTime()
	let postedAt = new Date(post.postedAt).getTime()
	
	let diff = (date - postedAt) / 3600 / 60 / 24

	switch (true) {
		case diff > 24:
			diff /= 24
			break
	}

	console.log(diff)
}

//#endregion

//#region CHANNEL
async function toggleLockChannel(userId) {
	const channelList = await dataService.getChannelsByOwnerId(userId)
	const channel = channelList[0]

	console.log(channel.toggleLock())
}

async function toggleActiveChannel(userId) {
	const channelList = await dataService.getChannelsByOwnerId(userId)
	const channel = channelList[0]

	console.log(channel.toggleActive())
}
//#endregion

//#region EVENT
async function toggleActiveEvent(userId) {
	
}
//#endregion

//#region CANVA

async function checkCanvaDepth() {
	const user = await dataService.getUserById(id)

	console.log(user.canvas.maxDepth)

}

function rainbow() {
	let datas = {
		title: 'Test canva',
		content: 'Content canva'
	}

	let i = 0
	while (i < 100) {
		createdCanva(id, datas)
		i++
	}
}
//#endregion


// #region ----- USER
	// getFriendsList(id)
	// checkIsLiked(id, '6164266e19660aedcf942a0f')
	// comparePwd('test')
	// countPosts()
	// countElements()
	// toggleAdmin()
//#endregion

//#region ----- POST
	// getPostTimeAgo('6164266e19660aedcf942a0f')
	// getPostScore('6164266e19660aedcf942a0f')
	// lockPost(id)
	// toggleActivePost(id)
//#endregion

//#region ----- CHANNEL
	// toggleActiveChannel(id)
	// toggleActiveChannel(id)
//#endregion

//#region CANVA
	// checkCanvaDepth()
	// rainbow()
//#endregion