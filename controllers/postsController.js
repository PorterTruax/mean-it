const express = require('express');
const router = express.Router();

const User = require('../models/user')
const Topic = require('../models/topic')
const Post = require('../models/post')

router.get('/new', (req,res) => {
	res.send('new route working')
})



//exportRouter
module.exports = router