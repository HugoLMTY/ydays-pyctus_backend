const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const postSchema = new Schema({

	author:		{ type: ObjectId, ref: 'User', required: true},

	isActive:	{ type: Boolean, default: true },

	title: 		{ type: String, default: 'Nouveau post'		},
	content:	{ type: String, default: 'Contenu du post'	},

	hasImages:	{ type: Boolean	, default: false},
	images:		[{ type: String	}],

	createdAd:	{ type: Date, default: new Date() },
	postedAt: 	{ type: Date },

	differed:	{ type: Boolean, default: false	},
	toPostAt:	{ type: Date },

	postAs: { type: String, enum: [
		'student',
		'cursus',
		'staff',
		'bde/bds',
		'angel',
	], default: 'student'},

	target: {

		isGroup:	{ type: Boolean, default: false	},
		group: 		{ type: ObjectId, ref: 'Group'	},

		isChannel:	{ type: Boolean, default: false	},
		channel:	{ type: ObjectId, ref: 'Channel'},

		level: [{
			b1:	{ type: Boolean, default: true },
			b2:	{ type: Boolean, default: true },
			b3:	{ type: Boolean, default: true },
			m1:	{ type: Boolean, default: true },
			m2:	{ type: Boolean, default: true },
		}],

		cursus: [{
			info:		{ type: Boolean, default: true },
			crea:		{ type: Boolean, default: true },
			marcom:		{ type: Boolean, default: true },
			audioviual:	{ type: Boolean, default: true },
			videoGame:	{ type: Boolean, default: true },
		}],

		campus: [{
			lille:			{ type: Boolean, default: true },
			paris:			{ type: Boolean, default: true },
			rennes:			{ type: Boolean, default: true },
			nantes:			{ type: Boolean, default: true },
			lyon:			{ type: Boolean, default: true },
			bordeaux:		{ type: Boolean, default: true },
			montpellier:	{ type: Boolean, default: true },
			nice:			{ type: Boolean, default: true },
			toulouse:		{ type: Boolean, default: true },
			aix:			{ type: Boolean, default: true },
			rabat:			{ type: Boolean, default: true },
			casablanca:		{ type: Boolean, default: true },
		}],
	},

	allowComments:	{ type: Boolean, default: true },
	comments: [{
		user: 		{ type: ObjectId, ref: 'User' },
		content: 	{ type: String	},
		reactions:	[{
			user:	{ type: ObjectId, ref: 'User' },
			type:	{ type: String	}
		}]
	}],

	allowReactions:	{ type: Boolean, default: true },
	reactions:	[{
		user:	{ type: ObjectId, ref: 'User' },
		type:	{ type: String	}
	}]

})

postSchema.methods.toggleLock = function() {
	try {
		const state = this.allowComments === true && this.allowReactions === true
	
		this.allowComments 	= !state
		this.allowReactions	= !state
	
		this.save()
		return this
	} catch(err) { return err }
}

postSchema.methods.toggleActive = function() {
	try {
		this.isActive = !this.isActive

		this.allowComments 	= this.isActive
		this.allowReactions = this.isActive

		this.save()

		return this
	} catch(err) { return err }
}

postSchema.methods.setInactive = function() {
	try {
		this.isActive = false

		this.allowComments = false
		this.allowReactions = false

		this.save()
		return this
	} catch(err) { return err }
}


postSchema.index({ location: '2dsphere' })
postSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Post', postSchema)