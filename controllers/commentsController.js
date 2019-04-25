const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Topic = require('../models/topic')
const Post = require('../models/post')
const Comment = require('../models/comment')



//exportRouter
module.exports = router