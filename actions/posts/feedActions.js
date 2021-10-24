const dataService = require('../../services/dataService')

class feedActions {

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
	
	async getFeedPostList(sort, params = {}, res) {
		this.log(`GET FEED POSTS BY ${sort}`)
		try {
			const postList = await dataService.getAllPosts({ isActive: true })
			let list = []

			// Ajouter un algo de scorging
			list = postList

			res.status(200).send(list)
		} catch(err) { this.handleError(err, res) }
	}
	
	async getFeedPostListByUserId(userId, sort, params =  { isActive: true, limit: 42, skip: 0 }, res) {
		this.log(`GET FEED POSTS USER BY ${sort}`)	
		try {
			
			const user = await dataService.getUserById(userId)	
			let postList 	= []
			let sortedList 	= []
			let finalList 	= []

			for (let index = 0; index < user.subs.length; index++) {
				const c = user.subs[index]
				const channel = await dataService.getChannelById(c.channel._id)
				
				channel.posts.forEach(p => {
					postList.push(p)
					const flooding = true
	
					if (flooding) {
						let flood = 50
						let count = 0
						while (count < flood) {
							postList.push(p)
							count++
						}
					}
				})

			}

			for (let index = 0; index < user.friends.accepted.length; index++) {
				const friend = user.friends.accepted[i]
				const list = await dataService.getAllUserPosts(friend._id, params)

				list.forEach(p => {
					postList.push(p)
				})
			}


			for (let index = 0; index < postList.length; index++) {
				const post = postList[index];
				
				let score = 0

				let dateMult 		= 0.5
				let commentMult		= 1
				let reactionMult 	= 1

				// console.log(post.)

				const date = new Date(post.postedAt)

				const datePoint = (new Date().getTime() - new Date(post.postedAt).getTime()) / 3600 / 60 / 24
				const reactionPoint = post.reactions?.length	|| 0
				const commentPoint = post.comments?.length		|| 0

				score = ( (datePoint * dateMult) + (reactionPoint * reactionMult) + (commentPoint * commentMult)) / 3

				let datas = {
					post, 
					score,
					date
				}
				sortedList.push(datas)
            

				switch (sort) {
					case 'new':
						sortedList
							.sort(function (a, b) { return a.date - b.date })
							.reverse()
						break

					case 'hot':
					default:
						sortedList
							.sort(function (a, b) { return a.score - b.score })
							.reverse()	
						break
				}
			}

			let maxPosts = sortedList.length > 42 ? 42 : sortedList.length

			for (let index = 0; index < maxPosts; index++) {
				const item = sortedList[index];
				finalList.push(item.post)
			}
			
			console.log('final: ', finalList.length)
			res.status(200).send(finalList)
		} catch(err) { this.handleError(err, res) }
	}
}

module.exports = new feedActions