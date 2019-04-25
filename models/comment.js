const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	body: {type: String, required: true},
	date: {type: Date},
	author: {type: String}
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment