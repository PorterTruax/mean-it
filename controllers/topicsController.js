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

router.post('/', (req,res) => {
	//our post route needs to create a topic

	res.send('route hits')

})


router.get('/new', async(req, res) => {
	try{

	const foundUser = await User.findOne({_id: req.session.usersDbId})

	res.render('topics/new.ejs',{
		user: foundUser
	})

	} catch(err) {
		res.send()
	}
})




//exportRouter
module.exports = router