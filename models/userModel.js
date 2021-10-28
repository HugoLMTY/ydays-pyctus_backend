const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const bcrypt = require('bcrypt')

const userSchema = new Schema({

	firstName: 	{ type: String, required: true },
	lastName: 	{ type: String, required: true },

	sex:		{ type: String	},
	birthdate:	{ type: Date	},

	phone:		{ type: Number	},
	email: 		{ type: String, required: true, unique: true },
	password: 	{ type: String, required: true },
	
	desc:		{ type: String	},

	preferences: {
		sort: 	{ type: String,	enum: ['hot', 'new'],	 default: 'hot'  },
		theme:	{ type: String,	enum: ['light', 'dark'], default: 'light'},
	},
	
	isOnline:	{ type: Boolean },

	isActive: 		{ type: Boolean, default: true 	},
	isBanned:		{ type: Boolean, default: false	},
	banReason:		{ type: String },

	isDelegue:		{ type: Boolean, default: false },
	isCertified: 	{ type: Boolean, default: false },
	isStaff:		{ type: Boolean, default: false },
	isBDS:			{ type: Boolean, default: false },
	isBDE:			{ type: Boolean, default: false },
	isAngel:		{ type: Boolean, default: false },
	isAdmin:		{ type: Boolean, default: false },

	hasCertifiedPhone:	{ type: Boolean, default: false },
	hasCertifiedMail:	{ type: Boolean, default: false },

	registeredAt: 	{ type: Date, default: new Date() },
	lastConnection: { type: Date, default: new Date() },

	situation: {
		studentSince: 	{ type: Date   	},
		level:			{ type: String, enum: ['b1', 'b2', 'b3', 'm1', 'm2' ]},
		cursus:			{ type: String, enum: ['info', 'crea', 'marcom', 'audiovisuel', '3d' ]},
		campus:			{ type: String, enum: ['lille', 'paris', 'rennes', 'nantes', 'lyon', 'bordeaux', 'montpellier', 'nice', 'toulouse', 'aix', 'rabat', 'casablanca']}
	},

	posts: {
		created: [{
			post:		{ type: ObjectId, ref: 'Post' },
			postedAt:	{ type: Date, default: new Date()	},
			isShared:	{ type: Boolean },
		}],
		liked:	[{
			post:		{ type: ObjectId, ref: 'Post' },
			likedAt:	{ type: Date, default: new Date() }
		}]
	},

	channels: [{ type: ObjectId, ref: 'Channel' }],

	friends: {
		sent: 		[{ type: ObjectId, ref: 'User' }],
		received: 	[{ type: ObjectId, ref: 'User' }],
		accepted: 	[{ type: ObjectId, ref: 'User' }],
	},

	subs: [{
		channel:	{ type: ObjectId, ref: 'Channel'	},
		since:  	{ type: Date, 	default: new Date() },
		rank: 		{ type: Number, default: 0 			},
	}],

	follows: {
		following: 	[{
			since: 	{ type: Date 				 	},
			user: 	{ type: ObjectId, ref: 'User'	}
		}],
		followed: 	[{
			since: 	{ type: Date 				 	},
			user: 	{ type: ObjectId, ref: 'User'	}
		}],
	},

	events: [{
		isActive: 		{ type: Boolean },
		event: 			{ type: ObjectId, ref: 'Event' },

		isOwner:		{ type: Boolean },
		registeredAt: 	{ type: Date 	},

		guests: {
			firstName:	{ type: String },
			lastName:	{ type: String },
			age:		{ type: Number },
			isUser:		{ type: String },
			user:		{ type: ObjectId, ref: 'User' }
		}
	}],

	// canvas: {
	// 	maxDepth:		{ type: Number },
	// 	canva: 			[{ type: ObjectId, ref: 'Canva' }]
	// },

	todoList: [{ 
		todo:		{ type: ObjectId, ref: 'Todo' 	},
		maxItems:	{ type: Number } 
	}],

})

userSchema.methods.comparePassword = async function(pwd) {
	return await bcrypt.compare(pwd, this.password)
}

userSchema.methods.postCount = function() {
	return this.posts.length
}

userSchema.methods.countElements = function() {
	return {
		posts: 		this.posts.length,
		channels: 	this.channels.length,
		friends:	this.friends.accepted.length,
		events: 	this.events.length,
		follows:	this.follows.following.length,
	}
}

userSchema.methods.toggleAdmin = function() {
	try {
		this.isAdmin = !this.isAdmin

		this.save()
		return this 
	} catch(err) { return err }
}

userSchema.methods.toggleActive = function() {
	try {
		this.isActive = !this.isActive

		this.save()
		return this 
	} catch(err) { return err }
}

userSchema.methods.toggleCertified = function() {
	try {
		this.isCertified = !this.isCertified

		this.save()
		return this 
	} catch(err) { return err }
}

userSchema.methods.toggleHasPhone = function() {
	try {
		this.hasCertifiedPhone = !this.hasCertifiedPhone

		this.save()
		return this
	} catch(err) { return err }
}

userSchema.methods.toggleHasMail = function() {
	try {
		this.hasCertifiedMail = !this.hasCertifiedMail

		this.save()
		return this
	} catch(err) { return err }
}

userSchema.methods.setIsOnline = function() {
	try {
		this.isOnline = true

		this.save()
		return this
	} catch(err) { return err }
}

userSchema.methods.setIsOffline = function() {
	try {
		this.isOnline = false

		this.save()
		return this
	} catch(err) { return err }
}

userSchema.index({ location: '2dsphere'})
userSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('User', userSchema)