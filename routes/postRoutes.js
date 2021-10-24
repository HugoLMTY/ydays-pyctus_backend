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






//#region --------------- FEED

router.route('/feed')
	.get(postController.getFeedPostList)
	.post(postController.getFeedPostList)

router.route('/feed/:userId')
	.get(postController.getFeedPostListByUserId)
	.post(postController.getFeedPostListByUserId)

//#endregion


//#region --------------- GET BY ID

router.route('/:postId')
	.get(postController.getPostById)
//#endregion
module.exports = router