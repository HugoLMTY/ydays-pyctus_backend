const { createdCanva } = require("./dataService")
const dataService = require("./dataService")

// const id = '61606061904cd5dd814d32b7' // HUGO LM
const id = '61642327f869de112cff95e3' // NEW USER


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