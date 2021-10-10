const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const canvaSchema = new Schema({

	title: 		{ type: String },
	content: 	{ type: String },

	onwer:		{ type: ObjectId, ref: 'User', required: true },
	createdAt:	{ type: Date },
	updatedAt:	{ type: Date },

	child: 		[{ type: ObjectId, ref: 'Todo', default: null }],
	parent: 	{ type: ObjectId, ref: 'Todo', default: null },
	maxDepth:	{ type: Number },

	color:		{ type: String },

	posX:		{ type: Number },
	posY:		{ type: Number },

	height:		{ type: Number },
	width: 		{ type: Number },
	
})

canvaSchema.method.getDepth = function() {
	let count

	while (this.parent) {
		this = this.parents
		count++
	}

	return count
}

canvaSchema.method.checkDepth = function() {
	return this.getDepth < this.maxDepth
}

canvaSchema.index({ location: '2dsphere' })
canvaSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Canva', canvaSchema)