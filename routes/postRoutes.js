const express = require('express')
const router = express.Router()

const postController = require('../controllers/postController')

router.route('/all')
	.get(postController.getAllPosts)
	.post(postController.getAllPosts)

router.route('/create/:userId')
	.post(postController.createPost)

router.route('/author/:userId')
	.get(postController.getPostsByAuthorId)

router.route('/update/author/:userId')
	.post(postController.updatePostsByAuthorId)

router.route('/update/:postId')
	.post(postController.updatePostById)

router.route('/:postId')
	.get(postController.getPostById)
module.exports = router