const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')

//require db
require ('./db/db.js')



//get app running
app.listen(3000, () => {
	console.log('app is listening on port: ', 3000);
})