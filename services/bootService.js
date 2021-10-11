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



// #region ----- USER
	// comparePwd('test')
	// countPosts()
	// countElements()
	// toggleAdmin()
//#endregion

//#region ----- POST
	// lockPost(id)
	// toggleActivePost(id)
//#endregion

//#region ----- CHANNEL
	// toggleActiveChannel(id)
	// toggleActiveChannel(id)
//#endregion