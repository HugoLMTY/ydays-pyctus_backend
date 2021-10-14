const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const canvaSchema = new Schema({
	title: 		{ type: String },
	content: 	{ type: String },

	isActive:	{ type: Boolean, default: true },

	owner:		{ type: ObjectId, ref: 'User', required: true },
	createdAt:	{ type: Date, default: new Date() },
	updatedAt:	{ type: Date, default: new Date() },

	child: 		[{ type: ObjectId, ref: 'Canva', default: null }],
	parent: 	{ type: ObjectId, ref: 'Canva', default: null },

	color:		{ type: String },

	posX:		{ type: Number },
	posY:		{ type: Number },

	height:		{ type: Number },
	width: 		{ type: Number },
})

// canvaSchema.methods.getDepth = function() {
// 	let count
	
// 	while (this.parent) {
// 		this = this.parents
// 		count++
// 	}

// 	return count
// }

canvaSchema.methods.checkDepth = function(userMaxDepth) {
	return this.getDepth < userMaxDepth
}

canvaSchema.methods.toggleActive = function() {
	this.isActive = !this.isActive
}

canvaSchema.methods.setInactive = function() {
	try {
		this.isActive = false

		this.save()
		return this
	} catch(err) { return err }
}

canvaSchema.index({ location: '2dsphere' })
canvaSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Canva', canvaSchema)