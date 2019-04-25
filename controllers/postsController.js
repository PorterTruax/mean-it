const express = require('express');
const router = express.Router();

const User = require('../models/user')
const Topic = require('../models/topic')
const Post = require('../models/post')

//GET ROUTE FOR POSTS SHOW PAGE

router.get('/:id', async (req,res) => {
	res.send('test')
})


//exportRouter
module.exports = router