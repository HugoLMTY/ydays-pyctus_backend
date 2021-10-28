const actions 		= require('../actions/userActions')
const postActions 	= require('../actions/users/postActions')
const friendsAction = require('../actions/users/friendsActions')

exports.getAllUsers = (req, res) => {
	const params = req.body
	actions.getAllUser(params, res)
}

exports.getUserById = (req, res) => {
	const { userId } = req.params
	actions.getUserById(userId, res)
}

exports.getUserByEmail = (req, res) => {
	const { userEmail } = req.params
	actions.getUserByEmail(userEmail, res)
}

exports.createUser = (req, res) => {
	const datas = req.body
	actions.createUser(datas, res)
}

exports.updateUserById = (req, res) => {
	const { userId } = req.params
	const changes = req.body
	actions.updateUserById(userId, changes, res)
}

exports.updateUserChannelSub = (req, res) => {
	const { userId } = req.params
	const { channelId, action} = req.body
	actions.updateUserChannelSub(userId, channelId, action, res)
}

exports.toggleIsLikedPost = (req, res) => {
	const { userId } = req.params
	const { postId } = req.body
	postActions.toggleLikedPost(userId, postId, res)
}

exports.getPotentialFriendsByUserId = (req, res) => {
	const { userId, limit } = req.params
	friendsAction.getPotentialFriendsByUserId(userId, limit, res)
}

exports.sendFriendRequest = (req, res) => {
	const { userId } = req.params
	const { targetId } = req.body
	friendsAction.sendFriendRequest(userId, targetId, res) 
}

exports.answerFriendRequest = (req, res) => {
	const { userId } = req.params
	const { targetId, action } = req.body
	friendsAction.answerFriendRequest(userId, targetId, action, res)
}

exports.cancelFriendRequest = (req, res) => {
	const { userId } = req.params
	const { targetId } = req.body
	friendsAction.cancelFriendRequest(userId, targetId, res)
}

exports.removeFriend = (req, res) => {
	const { userId } = req.params
	const { targetId } = req.body
	friendsAction.removeFriend(userId, targetId, res)
}