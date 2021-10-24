const jwt = require('jsonwebtoken')

const passport = require('passport')
const passportJwt = require('passport-jwt')
const { ExtractJwt, Strategy } = passportJwt

const dataService = require('./services/dataService')

passport.serializeUser((user, cb) => {
	cb(null, user._id)
})

passport.deserializeUser((id, cb) => {
	dataService.getUserById(id)
		.then(user => cb(false, user))
		.catch(err => cb(err, null))
})

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: '420key'
}

passport.use(new Strategy(jwtOptions, function(payload, cb) {
	dataService.getUserById(payload.id)
		.then(user => { cb(false, user) })
		.catch(err => { cb(err, null)	})
}))

const tokenAuth = passport.authenticate('jwt')

const isAdmin 		= req 				=> req.user?.isAdmin
const isStaff 		= req 				=> req.user?.isStaff
const isDelegue 	= req 				=> req.user?.isDelegue
const isBD	 		= req 				=> req.user?.isBDE || req.user?.isBDS

const isParticipant = (req, eventId) 	=> req.user.events.some(val => val.event == eventId)
const isSubed		= (req, channelId)	=> req.user.subs.some(val => val.channel == channelId)


const generateToken = (payload) => jwt.sign(payload, jwtOptions.secretOrKey)
const generateAuthToken = (payload) => ({
	token: generateToken({
		id: payload._id, 
		email: payload.email
	}),
})

module.exports = {
	passport,
	generateToken,
	generateAuthToken,
	middleswards: {
		tokenAuth
	},
	guards: {
		isAdmin,
		isStaff,
		isDelegue,
		isBD,

		isParticipant,
		isSubed
	}
}