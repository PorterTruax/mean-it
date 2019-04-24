const express = require('express');
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcryptjs');

//GET LOGIN PAGE
router.get('/login', async (req, res) => {
	res.render('login.ejs')
})

//REGISTER ROUTER

router.post('/register', async (req,res) => {

	const password = req.body.password;

	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

	const userDbEntry = {};

	userDbEntry.name = req.body.name
	userDbEntry.password = passwordHash
	userDbEntry.img = req.body.img

	console.log(userDbEntry + "<====== user db to be created");

	try {

		const createdUser = await User.create(userDbEntry)
		console.log(createdUser +"<====== created user");

		req.session.logged = true

		req.session.usersDbId = createdUser._id;
		console.log(req.session +"<====== session object");

		res.send('Successfully created: '+ createdUser) 

	}catch (err) {
		res.send(err)
	}

})

//exportRouter
module.exports = router