const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const todoSchema = new Schema({

	title:	{ type: String },
	decs: 	{ type: String },

	owner:		{ type: ObjectId, ref: 'User' },
	createdAt:	{ type: String },
	updatedAt:	{ type: String },

	cols:	[{
		title:		{ type: String },

		elements: [{
			title:		{ type: String },
			content:	{ type: String },
			
			rank:		{ type: Number },
			color:		{ type: String },

			comments:	[{
				user:		{ type: ObjectId, ref: 'User' },
				content:	{ type: String },
				createdAt:	{ type: Date   },
				updatedAt:	{ type: String },
			}]
		}]
	}],


	isPublic:		{ type: String },
	contributors:	{
		user:	{ type: ObjectId, ref: 'User', required: true },
		since:	{ type: Date },
		perms:	[{
			canRead:	{ type: Boolean, default: false },
			canComment:	{ type: Boolean, default: false },
			canEdit:	{ type: Boolean, default: false },
		}]
	}
	
})

todoSchema.method.togglePublic = function() {
	this.isPublic = !this.isPublic
}

todoSchema.index({ location: '2d' })
todoSchema.plugin(mongoosePaginate)

module.exports = mongoose.mongo.model('Todo', todoSchema)