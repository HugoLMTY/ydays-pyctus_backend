const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const groupSchema = new Schema({

	title:			{ type: String },
	description:	{ type: String },

	owner:			{ type: ObjectId, ref: 'User' },
	createdAt:		{ type: Date },

	participants:	[{
		user:		{ type: ObjectId, ref: 'User' },
		joinedAt: 	{ type: Date },
		isAdmin:	{ type: Boolean, default: false }
	}],

	messages: [{

		user:	{ type: ObjectId, ref: 'User' },
		sentAt:	{ type: Date },
		readBy:	[{ type: ObjectId, ref: 'User' }],

		hasImage:	{ type: Boolean, default: false },
		images:		[{ type: String }],

		answers: [{
			user:		{ type: ObjectId, ref: 'User' },
			content:	{ type: String },

			hasImage:	{ type: Boolean, default: false },
			images:		[{ type: String }],

			reactions:	[{
				user:	{ type: ObjectId, ref: 'User' },
				type:	{ type: String	}
			}]
		}],

		reactions:	[{
			user:	{ type: ObjectId, ref: 'User' },
			type:	{ type: String	}
		}]
	}]	
})

groupSchema.index({ location: '2dsphere'})
groupSchema.plugin(mongoosePaginate)

module.exports = mongoose.mongo.model('Group', groupSchema)