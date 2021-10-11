const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')

router.route('/login')
	.post(authController.loginUser)

router.route('/logout/:userId')
	.get(authController.logoutUser)

module.exports = router