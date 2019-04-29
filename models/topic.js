const mongoose = require('mongoose');
const Post = require('./post')


const topicSchema = new mongoose.Schema({
	name: {type: String, required: true, unique: true},
	date: {type: Date, required: true},
	img:{
			data: Buffer, 
			contentType: String
	},
	author: {type: String},
	body: {type: String, required: true},
	posts: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post'
	}]
})

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic