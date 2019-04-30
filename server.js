const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const sharp = require('sharp')
const morgan = require('morgan')
const multer = require('multer')
require('dotenv').config()


//require db
require ('./db/db.js')


//controllers
const usersController = require('./controllers/usersController')
const topicsController = require('./controllers/topicsController')
const postsController = require('./controllers/postsController')
const commentsController = require('./controllers/commentsController')

const PORT = process.env.PORT

//middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(session({
	secret:process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))
app.use(morgan('dev'));

app.use(express.static(__dirname+ '/client'))


app.use('/users', usersController)


app.use((req,res, next) => {
	if (!req.session.logged) {
		res.redirect('/users/login')
	} else{
		next()
	}
})

app.use('/topics', topicsController)
app.use('/posts', postsController)
app.use('/comments', commentsController)



//get app running
app.listen(PORT, () => {
	console.log('app is listening on port: ', PORT);
})