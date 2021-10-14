const dataService = require('../services/dataService')

class canvaActions {

	log(target) {
		const isActive = true
		if (isActive) console.log(`---- ${target} ----`) 
	}
	
	handleError(err, res) { 
		console.log(err); 
	
		return res 
		? res.status(500).send(err) 
		: null
	}

	async createCanva(userId, datas, res) {
		this.log('CREATE CANVA')
		try {
			const user = await dataService.getUserById(userId)
			const canva = await dataService.createCanva(userId, datas)

			let $datas = {
				maxDepth: 10,
				canva
			}
			user.canvas.push($datas)
			user.save()

			res.status(200).send(canva)			
		} catch(err) { this.handleError(err, res) }
	}

	async createChildCanva(userId, parentId, datas, res) {
		this.log('CREATE CHILD CANVA')
		try {
			const parent 	= await dataService.getCanvaById(parentId)
			const newCanva 	= await dataService.createCanva(userId, datas)

			parent.child.push(newCanva)
			await parent.save()
	
			newCanva.parent = parent
			await newCanva.save()

			res.status(200).send(newCanva)
		} catch(err) { this.handleError(err, res) }
	}
}

module.exports = new canvaActions()