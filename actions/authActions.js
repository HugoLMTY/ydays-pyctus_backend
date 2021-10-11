const dataService = require('../services/dataService')

class authActions {

	log(target) { 
		const isActive = true
		if (isActive) console.log(`---- ${target} ----`) 
	}

	handleError(status, res) {
		let err = ''

		switch (status) {
			case 401:
				err = 'Mot de passe erroné'
				break

			case 403:
				err = 'Utilisateur banni'
				break

			case 404:
				err = 'Aucun utilisateur trouvé'
				break
			
			case 500:
			default:
				err = 'Une erreur est survenue'
				break
		}

		return res 
		? res.status(status).send(err) 
		: null
	}

	async loginUser(datas, res) {
		this.log('LOGIN USER')
		const {
			email,
			password
		} = datas

		try {
			const user = await dataService.getUserByEmail(email)
			
			if (!user) 
				return this.handleError(404, res)
				
			if (user.isBanned) 
				return this.handleError(403, res)
			
			if (!await user.comparePassword(password))
				return this.handleError(401, res)
			
			user.setIsOnline()
			res.status(200).send(user)
		} catch(err) { this.handleError(500, res) }
	}

	async logoutUser(userId, res) {
		this.log('LOGOUT USER')
		try {
			const user = await dataService.getUserById(userId)

			if (!user) this.handleError(404, res)
			user.setIsOffline()

			res.status(200).send(user)
		} catch(err) { this.handleError(500, res) }
	}
}

module.exports = new authActions