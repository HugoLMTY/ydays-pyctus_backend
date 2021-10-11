const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const eventSchema = new Schema({

	title:	{ type: String, default: 'Nouvel Event' 	},
	desc:	{ type: String, default: 'Desc de l\'event' },

	hasImages:	{ type: Boolean, default: false },
	images:		[{ type: String }],

	type:		{ type: String	},
	location:	{ type: String 	},

	isActive:	{ type: Boolean, default: true		},
	createdAt:	{ type: Date, default: new Date()	},
	
	owner:		{ type: ObjectId, ref: 'User' 		},

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

eventSchema.methods.getPlacesLeft = function() {
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

eventSchema.methods.toggleActive = function() {
	try {
		this.isActive = !this.isActive

		this.save()
		return this
	} catch(err) { return err }
}

eventSchema.methods.setInactive = function() {
	try {
		this.isActive = false

		this.save()
		return this
	} catch(err) { return err }
}

eventSchema.index({ location: '2dsphere' })
eventSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Event', eventSchema)