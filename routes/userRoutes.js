const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

/**
 * Route gettting booking by id
 * @name 03-/all
 * @route {GET}  /api/user/all
 * @route {POST} //
 * @routeparam {params} 
 */

router.route('/all')
	.get(userController.getAllUsers)
	.post(userController.getAllUsers)

router.route('/create')
	.post(userController.createUser)

router.route('/email')
	.post(userController.getUserByEmail)


router.route('/update/:userId')
	.post(userController.updateUserById)


router.route('/:userId')
	.get(userController.getUserByEmail)

module.exports = router