const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const bcrypt = require('bcrypt')

const userSchema = new Schema({

	firstName: 	{ type: String, required: true },
	lastName: 	{ type: String, required: true },
	sex:		{ type: String	},
	birthdate:	{ type: Date 	},
	phone:		{ type: Number 	},

	email: 		{ type: String, required: true },
	password: 	{ type: String, required: true },

	desc:		{ type: String },

	isActive: 		{ type: Boolean, default: true 	},

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

	posts: [{
		post:		{ type: ObjectId, ref: 'Post' },
		postedAt:	{ type: Date 	},
		isShared:	{ type: Boolean },
	}],

	friends: {
		sent: 		[{ type: ObjectId, ref: 'User' }],
		received: 	[{ type: ObjectId, ref: 'User' }],
		accepted: 	[{ type: ObjectId, ref: 'User' }],
	},

	subs: [{
		since:  { type: Date },
		rank: 	{ type: Number }
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
		event: 			{ type: ObjectId, ref: 'Event' },
		registeredAt: 	{ type: Date 	},
		isActive: 		{ type: Boolean },

		guests: {
			firstName:	{ type: String },
			lastName:	{ type: String },
			age:		{ type: Number },
			isUser:		{ type: String },
			user:		{ type: ObjectId, ref: 'User' }
		}
	}]
})

userSchema.method.comparePassword = function(pwd) {
	return bcrypt.compare(this.password, pwd)
}

userSchema.method.toggleAdmin = function() {
	this.isAdmin = !this.isAdmin
	return this.save()
}

userSchema.method.toggleActive = function() {
	this.isActive = !this.isActive
	return this.save()
}

userSchema.method.toggleCertified = function() {
	this.isCertified = !this.isCertified
	return this.save()
}

userSchema.method.toggleHasPhone = function() {
	this.hasCertifiedPhone = !this.hasCertifiedPhone
	return this.save()
}

userSchema.method.toggleHasMail = function() {
	this.hasCertifiedMail = !this.hasCertifiedMail
	return this.save()
}

userSchema.index({ location: '2dsphere'})
userSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('User', userSchema)