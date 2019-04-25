const express = require('express');
const router = express.Router();

const User = require('../models/user')
const Topic = require('../models/topic')
const Post = require('../models/post')

router.get('/new', async (req,res) => {

	const findAllTopics = await Topic.find({})

	res.render('posts/new.ejs', {
		topics: findAllTopics
	})
})


router.post('/', async (req,res) => {

	try {

		const createdPost = await Post.create(req.body)
		console.log(createdPost + "<==== this is the found post");

		const foundTopic = await Topic.findOne({_id: req.body.topicId})
		console.log(foundTopic + "<=== this is the found topic where the posts belongs")


		console.log("\n", "here is created post\n")
			console.log(createdPost)

		console.log("\n\nhere is foundTopic:")
		console.log(foundTopic.posts)
		
		foundTopic.posts.push(createdPost)
		console.log("\nhere is foundTopic after we pshed")

		console.log(foundTopic)

		await foundTopic.save()

		console.log(foundTopic + "<===== post pushed into the foundtopic");

		res.redirect('/topics/' + req.body.topicId)

	} catch(err) {
		res.send(err)
	}

})



//exportRouter
module.exports = router