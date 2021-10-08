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


router.route('/profile/:userId')
	.get(userController.getUserByEmail)


router.route('/mail')
	.post(userController.getUserByEmail)

module.exports = router