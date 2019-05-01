const express = require('express');
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcryptjs');



//use Multer to set up file storage destination (this is also set up in the server file)

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


//GET LOGIN PAGE
router.get('/login', async (req, res) => {
	res.render('login.ejs', {
		errorMessage: req.session.message
	})
})
//REGISTER ROUTER
router.post('/register', upload.single('img'), async (req,res, next) => {

	const password = req.body.password;

	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

	const userDbEntry = {};


//USE FIMULTER TO READ AND  ENCODE FILE
	const img = fs.readFileSync(req.file.path);



	const finalImg = {
		contentType: req.file.mimetype,
		data: img
	};

	userDbEntry.name = req.body.name
	userDbEntry.password = passwordHash
	userDbEntry.img = finalImg

	console.log(userDbEntry + "<====== user db to be created");

	try {
		const createdUser = await User.create(userDbEntry)
		// console.log(createdUser +"<====== created user");
		

		//this if/else statement isn't happening, we'd like it too
		if((createdUser.name === "Porter") || (createdUser.name ==="Jacob")){
			createdUser.super = true
			await createdUser.save()

			console.log(createdUser);

			console.log("is this conditional being followed");

			req.session.logged = true
			req.session.usersDbId = createdUser._id;
			// console.log(req.session +"<====== session object");
			res.redirect('/topics') 


		} else{

			req.session.logged = true
			req.session.usersDbId = createdUser._id;
			// console.log(req.session +"<====== session object");
			res.redirect('/topics') 
		}

	}catch (err) {
		req.session.message = 'Username or Password is incorrect';
		res.redirect('/users/login')
	}

})


router.post('/login', async (req,res) => {
	try{

		const foundUser = await User.findOne({'name': req.body.name})
		console.log(foundUser + "<=== found user");

		if(foundUser !== null){
			console.log(foundUser + "<=== found user secondTime");

			if(bcrypt.compareSync(req.body.password, foundUser.password) === true){

				console.log(foundUser + "<=== found user thirdTime");

				req.session.logged = true;
				req.session.usersDbId = foundUser._id

				console.log("user successfully logged in");
				res.redirect('/topics')
			}

			else{
				req.session.message = 'Username or Password is incorrect';
				res.redirect('/users/login')
			}

		} else {
			req.session.message = 'Username or Password is incorrect';
			res.redirect('/users/login')
		}

	} catch (err){
		next(err)
	}
})

router.get('/logout', async(req,res)=>{
	req.session.destroy((err)=>{
		if(err){
			res.send(error)
		}else{
			res.redirect('/users/login')
		}
	})
})


router.get('/:id', async (req,res)=>{
	try{
		
		const foundUser = await User.findById(req.params.id).populate('posts').populate('comments') 
		
		res.render('users/show.ejs',{
		newlyFoundUser: foundUser
	})
	}catch(err){
		res.send(err)
	}
	// console.log("This is the user with all posts/coms populated");
	// console.log(foundUser);

})


router.get('/:id/photo', async (req, res, next) => {
	try {
		const foundUser = await User.findById(req.params.id)

		res.set('Content-Type', foundUser.img.contentType)
		res.send(foundUser.img.data)

	}
	catch(err){
		next(err)

	}

})

//exportRouter
module.exports = router