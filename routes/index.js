const express = require('express');
const app = express();

const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

//Engine Ejs
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.set('views', '../views');
app.use(express.static('public'))

router.get('/', function(req, res, err){
    res.render('../views/home.ejs', { page: 'choice.ejs'});
    
});

router.get('/sign', function (req, res) {
    res.render('../views/home.ejs', { page: 'signin' });
});

module.exports = router;

// app.listen(3800, function(){console.log('Server listening port compelete '+ 3000)});