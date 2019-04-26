const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Topic = require('../models/topic')
const Post = require('../models/post')
const Comment = require('../models/comment')


router.delete('/:id', async (req,res,next) => {

	try{

		const foundPost = await Post.findOne({'comments':req.params.id})

		const foundComment = await Comment.findByIdAndRemove(req.params.id);

		res.redirect('/posts/'+foundPost._id)

	}catch (err) {
		next(err)
	}

})


//exportRouter
module.exports = router