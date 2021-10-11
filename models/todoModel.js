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

	isActive:	{ type: Boolean, default: true	},

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
			canRead:	{ type: Boolean, default: true },
			canComment:	{ type: Boolean, default: false },
			canEdit:	{ type: Boolean, default: false },
		}]
	}
	
})

todoSchema.methods.setPerms = function(userId, perms) {
	try {
		this.contributors.forEach(c => {
			if (c.user._id === userId) {
				switch(perms) {
					case 'read':
						c.perms.canRead		= true
						c.perms.canComment	= false
						c.perms.canEdit		= false
						break
		
					case 'comment':
						c.perms.canRead		= true
						c.perms.canComment	= true
						c.perms.canEdit		= false
						break
		
					case 'edit':
						c.perms.canRead		= true
						c.perms.canComment	= true
						c.perms.canEdit		= true
						break	

					default: 
						c.perms.canRead		= true
						c.perms.canComment	= false
						c.perms.canEdit		= false
						break
				}
			}
		})
		this.save()
		return this
	} catch(err) { return err }
}

todoSchema.methods.togglePublic = function() {
	try {
		this.isPublic = !this.isPublic

		this.save()
		return this
	} catch(err) { return err }
}

todoSchema.methods.toggleActive = function() {
	try {
		if (this.isActive) this.isPublic = false
		this.isActive = !this.isActive
	
		this.save()
		return this
	} catch(err) { return rer}
}

todoSchema.methods.setInactive = function() {
	try {
		this.isActive = false
		this.isPublic = false

		this.save()
		return this
	} catch(err) { return err}
}


todoSchema.index({ location: '2d' })
todoSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Todo', todoSchema)