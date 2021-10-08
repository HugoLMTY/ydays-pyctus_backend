const mongoose = require('mongoose')
const mongoosePaginate = require('mongoosePaginate')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const postSchema = new Schema({

	author:		{ type: ObjectId, ref: 'User'	},

	isActive:	{ type: Boolean },

	title: 		{ type: String	},
	content:	{ type: String	},

	hasImages:	{ type: Boolean	},
	images:		[{ type: String	}],

	differed:	{ type: Boolean	},
	toPostAt:	{ type: Date	},
	postedAt: 	{ type: Date	},

	postAs: { type: String, enum: [
		'staff',
		'cursus',
		'student',
		'bde/bds',
		'angel'
	]},

	target: {
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

	comments: [{
		user: 		{ type: ObjectId, ref: 'User' },
		content: 	{ type: String	},
		reactions:	[{
			user:	{ type: ObjectId, ref: 'User' },
			type:	{ type: String	}
		}]
	}],

	reactions:	[{
		user:	{ type: ObjectId, ref: 'User' },
		type:	{ type: String	}
	}]

})

postSchema.index({ location: '2dsphere' })
postSchema.plugin(mongoosePaginate)

module.exports = mongoose.mongo.model('Post', postSchema)