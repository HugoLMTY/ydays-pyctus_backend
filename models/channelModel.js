const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const channelSchema = new Schema({
	title:	{ type: String, default: 'Nouveau Channel' },
	desc: 	{ type: String, default: 'Description du channel' },
	icon:	{ type: String },

	url:	{ type: String },

	owner:		{ type: ObjectId, ref: 'User'		},
	createdAt:	{ type: Date, default: new Date()	},

	isActive:	{ type: Boolean, default: true },

	admins: [{
		user:	{ type: ObjectId, ref: 'User', required: true	},
		since:	{ type: Date, default: new Date()				},
		from:	{ type: ObjectId, ref: 'User', required: true	}
	}],

	members: [{
		user:		{ type: ObjectId, ref: 'User'	},
		role:		{ type: String, default: 'none', enum: ['none', 'certified', 'mod', 'admin'], required: true},
		isBanned:	{ type: Boolean, default: false	}
	}],

	allowPosts:	{ type: Boolean, default: true },
	posts: 		[{ type: ObjectId, ref: 'Post' }]
})

channelSchema.methods.toggleLock = function() {
	try {
		this.allowPosts = !this.allowPosts
		
		this.save()
		return this
	} catch(err) { return err }
}

channelSchema.methods.toggleActive = function() {
	try {
		this.isActive = !this.isActive
		this.allowPosts = this.isActive
		
		this.save()
		return this
	} catch(err) { return err }
}

channelSchema.methods.setInactive = function () {
	try {
		this.isActive = false
		this.allowPosts = false

		this.save()
		return this
	} catch(err) { return err }
}

channelSchema.methods.toggleAdmin = function(userId) {
	try {
		var isAdmin = false
		var target

		this.members.forEach(m => {
			if (m.user.id === userId) target = m  
		})

		m.role === 'admin'
		? m.role === 'none'
		: m.role === 'admin'

		this.save()
		return this
	} catch(err) { return err }
}

channelSchema.index({ location: '2dsphere'})
channelSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Channel', channelSchema)