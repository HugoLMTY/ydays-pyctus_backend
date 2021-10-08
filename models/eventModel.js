const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const eventSchema = new Schema({

	title: 			{ type: String 	},
	description: 	{ type: String 	},
	images:			[{ type: String }],

	type: 		{ type: String	},
	place:		{ type: String 	},

	isActive:	{ type: Boolean },

	openAt: 	{ type: Date	},
	closeAt: 	{ type: Date	},
	startAt: 	{ type: Date	},
	endAt:		{ type: Date	},
	
	offers:		[{
		id: 			{ type: String	},
		price:			{ type: Number	},
		places:			{ type: Number	},
		
		title: 			{ type: String	},
		description: 	{ type: String	},
	}],

	participants: [{
		user: 			{ type: ObjectId, ref: 'User' },
		offerId: 		{ type: String },
		registerdAt: 	{ type: Date },
		isActive:		{ type: Boolean }
	}],

})

eventSchema.method.toggleActive = function() {
	this.isActive = !this.isActive
	return this.isActive()
}

eventSchema.method.getPlacesLeft = function() {
	var offers = []

	this.offers.forEach(o => {
		let data = {
			id: 	o.id,
			title: 	o.title,
			places:	o.places,
			left: 	o.places,
		}
		offers.push(data)
	})

	this.participants.forEach(p => {
		offers.forEach(o => {
			if (p.offerId === o.id) o.left--
		})
	})

	return offers
}

eventSchema.index({ location: '2dsphere' })
eventSchema.plugin(mongoosePaginate)

module.exports = mongoose.mongo.model('Event', eventSchema)