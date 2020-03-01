const express = require('express');
const app = express();

const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

//Engine Ejs
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.set('views', '../views');
app.use(express.static('../public'));

//body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }), bodyParser.json());

//router
const User = require('../models/user_model.js');

//home page
router.get('/', function(req, res){
    res.render('../views/home.ejs', { page: 'choice.ejs'});
});

//sign page
router.get('/sign', function (req, res) {
    res.render('../views/home.ejs', { page: 'signin.ejs' });
});

//register user
router.post('/sign', async function(req,res){
    var status = false;
    if (req.body.alone) {
        status = true;
    };
    var newuser = new User({
        email: req.body.email,
        name: req.body.name,
        password: req.body.pwd,
        location: req.body.address,
        phone: req.body.phone,
        job: req.body.work,
        workplace: req.body.workplace,
        age: req.body.age,
        favorite: req.body.favorite,
        yourself: req.body.yourself,
        security: req.body.security,
        income: req.body.income,
        alone: status
    });

    try{
        const User = await newuser.save(function(err, data){
            if (err) {
                res.json({
                    kq: 0,
                    ErrMess: 'Loi~ ne`=====> ' + err
                });
                console.log(err);
            } else {
                // console.log('New User registed thanh` cong` '+ data);
                res.render('../views/home.ejs', { page: 'chat' });
            };
        });
    }catch(err){
        res.status(400).send(err);
    };
});

module.exports = router;

// app.listen(3800, function(){console.log('Server listening port compelete '+ 3000)});