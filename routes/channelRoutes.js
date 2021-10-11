const express = require('express')
const router = express.Router()

const channelController = require('../controllers/channelController')

router.route('/all')
	.get(channelController.getAllChannels)
	.post(channelController.getAllChannels)

router.route('/create/:userId')
	.post(channelController.createChannel)

module.exports = router