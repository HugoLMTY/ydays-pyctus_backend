const actions = require('../actions/postActions')

exports.createPost = (req, res) => {
	const { authorId, datas } = req.body
	actions.createPost(authorId, datas, res)
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
	const { authorId } = req.params
	actions.getPostsByAuthorId(authorId, res)
}

exports.updatePostById = (req, res) => {
	// Ajouter une comparaison currentUser: userId / post.ownerId
	// const { userId, postId, changes } = req.body
	// Skip si admin / allowed

	const { postId, changes } = req.body
	actions.updatePostById(postId, changes, res)
}

exports.updatePostsByAuthorId = (req, res) => {
	const { authorId, changes } = req.body
	actions.updatePostsByAuhtorId(authorId, changes, res)
}