const express = require('express')
const router = express.Router()

const canvaController = require('../controllers/canvaController')

router.route('/create/:userId')
	.post(canvaController.createCanva)

router.route('/create/child/:userId')
	.post(canvaController.createChildCanva)


module.exports = router