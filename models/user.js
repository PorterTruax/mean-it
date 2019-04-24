const mongoose = ('mongoose');
const Post = require('./post')
const Comment = require('./comment')

const userSchema = new mongoose.Schema({
	name: {type: String, unique: true, required: true},
	password: {type:String, unique: true, required: true},
	img: {type: String},
	super: Boolean,
	posts: [{
		type: mongoose.Schema.Types.ObjectId,
		ref:'Post'
	}],
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref:'Comment'
	}]

})

const User = mongoose.model('User', userSchema)

module.exports = User;