const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Topic = require('../models/topic')
const Post = require('../models/post')

router.post('/', async(req,res) => {
	res.send("Test")
})



//exportRouter
module.exports = router