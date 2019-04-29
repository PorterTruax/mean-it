const mongoose = require('mongoose')
const Comment = require('./comment')

const postSchema = new mongoose.Schema({
	name: {type: String, required: true},
	date: {type: Date},
	body: {type: String, required: true},
	img:{
			data: Buffer, 
			contentType: String
	},
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
	}]
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;