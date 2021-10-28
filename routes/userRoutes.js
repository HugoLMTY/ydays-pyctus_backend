const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')


//#region --------------- CREATE / UPDATE
router.route('/create')
	.post(userController.createUser)

router.route('/update/:userId')
	.post(userController.updateUserById)
//#endregion


	
//#region --------------- CHANNELS
router.route('/subscribe/:userId')
	.post(userController.updateUserChannelSub)
//#endregion



//#region --------------- FRIENDS
router.route('/friends/getPotential/:userId')
router.route('/friends/getPotential/:userId/:limit')
	.get(userController.getPotentialFriendsByUserId)


router.route('/friends/send/:userId')
	.post(userController.sendFriendRequest)

router.route('/friends/answer/:userId')
	.post(userController.answerFriendRequest)

router.route('/friends/cancel/:userId')
	.post(userController.cancelFriendRequest)

router.route('/friends/remove/:userId')
	.post(userController.removeFriend)
//#endregion



//#region --------------- TOGGLE
router.route('/toggle/:userId/post/isLiked')
	.post(userController.toggleIsLikedPost)
//#endregion


//#region --------------- GET
router.route('/all')
	.get(userController.getAllUsers)
	.post(userController.getAllUsers)

router.route('/email/:userEmail')
	.get(userController.getUserByEmail)

router.route('/:userId')
	.get(userController.getUserById)
//#endregion


module.exports = router