const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	body: {type: String, required: true},
	date: {type: Date}
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment