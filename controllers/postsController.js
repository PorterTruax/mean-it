const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Topic = require('../models/topic')
const Post = require('../models/post')
const Comment = require('../models/comment')






router.post('/:id', async(req,res) => {

	try{

		const createdComment = await Comment.create(req.body)
		// console.log("THE BELOW IS THE CREATED COMMENT");
		// console.log(createdComment);

		const foundUser = await User.findById(req.session.usersDbId)

		createdComment.author = foundUser.name

		await createdComment.save()
	
		const foundPost = await Post.findById(req.params.id)
		
		foundUser.comments.push(createdComment)
		
		foundPost.comments.push(createdComment)
	
		await foundUser.save()
	
		await foundPost.save()
	
		res.redirect('/posts/' + req.params.id);
		
	} catch(err) {
		res.send(err)
	}

})




//GET ROUTE FOR POSTS EDIT PAGE
router.get('/:id/edit', async (req,res) => {
	try{
		const foundPost = await Post.findById(req.params.id)
		const foundUser = await User.findById(req.session.usersDbId)

		res.render('posts/edit.ejs', {
			post: foundPost,
			user: foundUser
		})

	}catch(err) {
		res.send(err)
	}
})

router.put('/:id', async(req,res) => {
	const updatedName = req.body.name
	const updatedDate = req.body.date
	const updatedBody = req.body.body

	try{
		const foundPost = await Post.findById(req.params.id)

		foundPost.name = updatedName

		foundPost.date = updatedDate

		foundPost.body = updatedBody

		const savedPost = await foundPost.save()

		res.redirect('/posts/'  + req.params.id)

	} catch(err) {

		res.send(err)
	}

})

//DELETE ROUTE

router.delete('/:id', async(req,res) => {
	try {

		const foundPost = await Post.findByIdAndRemove(req.params.id)

		const foundUser = await User.findOne({_id: req.session.usersDbId})

		const foundTopic = await Topic.findOne({'posts': req.params.id})

		await foundUser.posts.remove(req.params.id)
		await foundUser.save()
		console.log(foundUser + "<=== the post is gone from the user");

		await foundTopic.posts.remove(req.params.id)

		await foundTopic.save()

		console.log(foundTopic + "<=== the post is gone from the topics");


		res.redirect('/topics/' + foundTopic._id);

	}catch(err) {
		res.send(err)
	}
})


router.get('/:id/photo', async(req,res,next)=>{
	try{
	const foundPost = await Post.findById(req.params.id)
	console.log(foundPost);

	res.set('Content-Type', foundPost.img.contentType)
	res.send(foundPost.img.data)

	}catch(err){
		next(err)
	}
})


//GET ROUTE FOR POSTS SHOW PAGE
router.get('/:id', async (req,res) => {
	try {

		const foundPost = await Post.findById(req.params.id).populate('comments')
		const foundUser = await User.findById(req.session.usersDbId)

		const foundAuthor = await User.findOne({"posts": req.params.id})
		console.log(foundAuthor);

		console.log("\n", "here is the found post\n")
		console.log(foundPost);

		res.render('posts/show.ejs', {
			author: foundAuthor,
			post: foundPost,
			user: foundUser
		})

	}catch(err) {
		res.send(err)
	}
})


//exportRouter
module.exports = router