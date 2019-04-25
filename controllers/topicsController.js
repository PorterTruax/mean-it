const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Topic = require('../models/topic')


//GET INDEX ROUTE
router.get('/', async (req,res)=> {

	try{
		const foundUser = await User.findOne({_id: req.session.usersDbId})

		const allTopics = await Topic.find({})

		if (foundUser.super === true){

			res.render('topics/index.ejs', {
				user: foundUser,
				topics: allTopics
			})


		} else {
			//render the page
			res.render('topics/index.ejs', {
				user: foundUser,
				topics: allTopics
			})

		}

	} catch(err){
		res.send(err)
	}
})


//POST NEW ITEM
router.post('/', async(req,res) => {
	//our post route needs to create a topic
	try{

		const foundUser = await User.findOne({_id: req.session.usersDbId})

		const createdTopic = await Topic.create(req.body)

		console.log(createdTopic);

		res.redirect('/topics')

	} catch(err){
		res.send(err)
	}

})


//GET NEW PAGE
router.get('/new', async(req, res) => {
	try{

		const foundUser = await User.findOne({_id: req.session.usersDbId})

		res.render('topics/new.ejs', {
			
			user: foundUser
		
		})

	} catch(err) {
		res.send()
	}
})


router.delete('/:id', async (req,res) => {

	try{

		const foundUser = await User.findOne({_id: req.session.usersDbId})

		console.log(req.session.usersDbId +"<=== this is the session object, userDBID");

		console.log(foundUser + " <==== this is the found user");

		const deletedTopic = await Topic.findByIdAndRemove({_id: req.params.id})

		console.log(deletedTopic + " <==== this is the topic to be deleted");

		// const findAllPosts = await Post.findMany({_id: {$in: deletedTopic.posts}})

		// if (findAllPosts !== null){

		// 	const deletedPosts = await Post.deleteMany({_id: {$in: deletedTopic.posts}})

		// 	res.redirect('/topics')
		// }

		// else {

		// 	res.redirect('/topics')

		// }

		// const deletedPosts = await Post.deleteMany({_id: {$in: deletedTopic.posts}})

		// console.log(deletedPosts +" <======== these are the deleted posts");

		res.redirect('/topics')

	}catch (err) {
		res.send(err)
	}

})

//PUT ROUTE


router.put('/:id', (req,res) => {
	res.send('route hitting')
})


//GET TOPIC EDIT PAGE

router.get('/:id/edit', async (req,res) => {
	try {

		const foundTopic = await Topic.findOne({_id: req.params.id})
		
		const foundUser = await User.findOne({_id: req.session.usersDbId})

		console.log(foundUser);
		console.log(req.session.usersDbId);

		res.render('topics/edit.ejs', {
			topic: foundTopic,
			user: foundUser
		})

	} catch(err) {
		res.send(err)
	}
})



// GET TOPIC SHOW PAGE

router.get('/:id', async (req,res) => {
	try {

		const foundTopic = await Topic.findOne({_id: req.params.id})
		
		const foundUser = await User.findOne({_id: req.session.usersDbId})

		console.log(foundUser);

		res.render('topics/show.ejs', {
			topic: foundTopic,
			user: foundUser
		})

	} catch(err){
		res.send(err)
	}
})




//exportRouter
module.exports = router