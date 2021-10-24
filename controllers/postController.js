const actions = require('../actions/postActions')
const feedActions = require('../actions/posts/feedActions')

exports.createPost = (req, res) => {
	const { userId } = req.params
	const { authorId, datas } = req.body

	if (userId === authorId) actions.createPost(authorId, datas, res)
	else res.status(403).send('unauthorized')
}

exports.getAllPosts = (req, res) => {
	const params = req.body
	actions.getAllPosts(params, res)
}

exports.getPostById = (req, res) => {
	const { postId } = req.params
	actions.getPostById(postId, res)
}

exports.getPostsByAuthorId = (req, res) => {
	const { userId } = req.params
	actions.getPostsByAuthorId(userId, res)
}

exports.updatePostById = (req, res) => {
	// Ajouter une comparaison currentUser: userId / post.ownerId
	// const { userId, postId, changes } = req.body
	// Skip si admin / allowed
	const { postId } = req.params
	const { changes } = req.body
	actions.updatePostById(postId, changes, res)
}

exports.updatePostsByAuthorId = (req, res) => {
	const { userId } = req.params
	const { authorId, changes } = req.body

	if (userId === authorId) actions.updatePostsByAuhtorId(authorId, changes, res)
	else res.status(403).send('unauthorized')
}


//#region --------------- FEED

exports.getFeedPostList = (req, res) => {
	console.log(req.body)
	const { sortType, params } = req.body
	feedActions.getFeedPostList(sortType, params, res)
}

exports.getFeedPostListByUserId = (req, res) => {
	const { userId } = req.params
	const { sortType, params } = req.body
	feedActions.getFeedPostListByUserId(userId, sortType, params, res)
}

//#endregion