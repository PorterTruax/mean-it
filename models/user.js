const mongoose = ('mongoose');
const Post = require('./post')
const Comment = require('./comment')

//talk to Reuben re: commments here.
//Without comments included here, how else will
//we reference a comment by one person on another person's post
//(i.e. how to reference a user if they're not the author of a post)
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