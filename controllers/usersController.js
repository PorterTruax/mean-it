const express = require('express');
const router = express.Router();

//GET LOGIN PAGE

router.get('/login', async (req, res) => {
	res.render('login.ejs')
})

//exportRouter
module.exports = router