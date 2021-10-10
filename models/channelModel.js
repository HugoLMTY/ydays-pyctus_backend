const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const channelSchema = new Schema({
	title:	{ type: String, default: 'Nouveau Channel' },
	desc: 	{ type: String, default: 'Description du channel' },

	icon:	{ type: String },
	createdAt:	{ type: Date },

	admins: [{
		user:	{ type: ObjectId, ref: 'User' }
	}],

	members: [{
		user:	{ type: ObjectId, ref: 'User' }
	}],

	posts: [{
		post:	{ type: ObjectId, ref: 'Post'}
	}]
})

channelSchema.index({ location: '2dsphere'})
channelSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Channel', channelSchema)