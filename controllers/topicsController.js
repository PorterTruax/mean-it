const express = require('express');
const router = express.Router();


//GET INDEX ROUTE
router.get('/', async (req,res)=> {
	res.render('topics/index.ejs')
})


//exportRouter
module.exports = router