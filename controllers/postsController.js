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

	const createdPost = await Post.create(req.body)

	try {


	} catch(err) {
		res.send(err)
	}


})



//exportRouter
module.exports = router