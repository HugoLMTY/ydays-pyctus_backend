const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

router.route('/all')
	.get(userController.getAllUsers)
	.post(userController.getAllUsers)

router.route('/create')
	.post(userController.createUser)

	
router.route('/email/:userEmail')
	.get(userController.getUserByEmail)

router.route('/update/:userId')
	.post(userController.updateUserById)
	

router.route('/:userId')
	.get(userController.getUserById)
	

module.exports = router