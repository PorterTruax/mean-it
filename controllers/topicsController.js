const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Topic = require('../models/topic')
const Post = require('../models/post')

//multer materials
const multer = require('multer')
const fs = require('fs')
const storage = multer.diskStorage({
	destination:function (req,file, cb) {
		cb(null, './client/uploads')
	}, 
	filename: function (req,file, cb){
		cb(null, file.fieldname+ '-' + Date.now())
	}
})

const upload = multer({storage: storage});




//GET INDEX ROUTE
router.get('/', async (req,res, next)=> {

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
		next(err)
	}
})


//POST NEW ITEM
router.post('/', upload.single('img'), async(req,res) => {
	//our post route needs to create a topic

	const topicEntry = {}

	const img = fs.readFileSync(req.file.path);

	const finalImg = {
		contentType: req.file.mimetype,
		data: img
	};

	topicEntry.name = req.body.name
	topicEntry.date = req.body.date
	topicEntry.body = req.body.body
	topicEntry.img = finalImg

	try{

		const foundUser = await User.findOne({_id: req.session.usersDbId})

		const createdTopic = await Topic.create(topicEntry)

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


router.delete('/:id', async (req,res, next) => {

	try{

		const topicToBeDeleted = await Topic.findOne({_id: req.params.id})

		console.log("The below is an array with the ids of the posts to be deleted");
	

		const foundUser = await User.findOne({_id: req.session.usersDbId})

		// const usersToHavePostsRemoved = await User.findMany({"posts": {$in: topicPostsToBeDeleted}})

		// console.log(req.session.usersDbId +"<=== this is the session object, userDBID");

		// console.log(foundUser + " <==== this is the found user");

		const deletedTopic = await Topic.findByIdAndRemove({_id: req.params.id})
		console.log(deletedTopic + " <==== this is the topic to be deleted");

		const deletedPosts = await Post.deleteMany({_id: {$in: deletedTopic.posts}})

		console.log(deletedPosts);

		res.redirect('/topics')

	}catch (err) {
		next(err)
	}

})

//PUT ROUTE


router.put('/:id', async (req,res) => {

	//break req.body into its components
	//because the form does not update the posts array

	const updatedAuthor = req.body.author
	console.log(req.body.author);

	const updatedName = req.body.name
	console.log(req.body.name);
	const updatedImg = req.body.img

	console.log(req.body.img);
	const updatedDate = req.body.date

	console.log(req.body.date);

	const updatedBody = req.body.body

	console.log(req.body.body);

	try {

		const foundTopic = await Topic.findById({_id: req.params.id})

		console.log(foundTopic);

		foundTopic.author = updatedAuthor

		foundTopic.name = updatedName

		foundTopic.img = updatedImg

		// foundTopic.date = updatedDate

		foundTopic.body = updatedBody

		const savedTopic = await foundTopic.save()

		console.log(savedTopic);

		res.redirect('/topics/'+req.params.id)

	} catch(err) {
		res.send(err)
	}
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

//CREATE NEW POST ROUTE.....

router.get('/:id/new', async(req,res) => {

	
	const foundTopic = await Topic.findOne({_id: req.params.id})
	const foundUser = await User.findById(req.session.usersDbId)

	res.render('posts/new.ejs', {
		topic: foundTopic,
		author: foundUser.name
	})
})


//REFERENCE CODE FOR WHAT WE'RE ABOUT TO DO
// FIRST BUILD A NEW PAGE FOR THE TOPIC ID

// BUILD A POST ROUTE FOR THE POST TO BE POSTED TO THE TOPIC

router.post('/:id', upload.single('img'), async (req,res) => {
	const postDbEntry = {};
	const img = fs.readFileSync(req.file.path);

	const finalImg = {
		contentType: req.file.mimetype,
		data: img
	};
	
	postDbEntry.name = req.body.name
	postDbEntry.date = req.body.date
	postDbEntry.body = req.body.body
	postDbEntry.img = finalImg

	try {

		const createdPost = await Post.create(postDbEntry)
		// console.log(createdPost + "<==== this is the created post");

		const foundTopic = await Topic.findById(req.params.id)
		// console.log(foundTopic + "<=== this is the found topic where the posts belongs")

		const foundUser = await User.findById(req.session.usersDbId)
		console.log(foundUser);

		foundUser.posts.push(createdPost)
		await foundUser.save()
		
		console.log("\n", "here is the user including the posts\n")
			console.log(foundUser)

		// console.log("\n\nhere is foundTopic:")
		// console.log(foundTopic.posts)
		
		foundTopic.posts.push(createdPost)
		// console.log("\nhere is foundTopic after we pshed")

		console.log(foundTopic)

		await foundTopic.save()

		console.log(foundTopic + "<===== post pushed into the foundtopic");

		res.redirect('/topics/' + req.params.id)

	} catch(err) {
		res.send(err)
	}

})

router.get('/:id/photo', async(req,res,next)=>{
	try{
	const foundTopic = await Topic.findById(req.params.id)
	console.log(foundTopic);

	res.set('Content-Type', foundTopic.img.contentType)
	res.send(foundTopic.img.data)

	}catch(err){
		next(err)
	}
})




// GET TOPIC SHOW PAGE
router.get('/:id', async (req,res) => {
	try {
		// const query = Topic.findOne({_id: req.params.id}).exec()
		
		// console.log(query)

		const foundTopic = await Topic.findOne({_id: req.params.id}).populate('posts')

		// await foundTopic.populate('posts')
		console.log("<===== found topic w/ posts")
		console.log(foundTopic);

		// await foundTopic.save()

		console.log(foundTopic +"<====== found topic saved");
		
		const foundUser = await User.findOne({_id: req.session.usersDbId})

		console.log(foundUser + "<==== found user");

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