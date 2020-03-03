const express = require('express');
const app = express();

const router = express.Router();
const jwt = require("jsonwebtoken");

//Engine Ejs
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.set('views', '../views');
app.use(express.static('../public'));

//body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }), bodyParser.json());

//bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

//validation only pass
// const passwordComplexity = require('joi-password-complexity');
// const complpassword = {
//     min: 6,
//     max: 30,
//     upperCase: 1,
//     numeric: 1,
//     requirementCount: 2,
// };

//router
const User = require('../models/user_model.js');
const {regisValidate, loginValidate} = require('../auth/authen.js');

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

    //Validate acc 
    //input data for validate acc

    const { error } = regisValidate(req.body);
    if(error) return res.status(400).send(error.details[0].message);


    //check email in database
    const emailcheck = await User.findOne({email:req.body.email});
    if(emailcheck) return res.status(400).send("Email already exists");

    //hash password
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) return next(err);
        // hash the password
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            if (err) return next(err);

            // set the hashed password back on our user document
            newuser.password = hash;
        });
    });

    var status = false;
    if (req.body.alone) {
        status = true;
    };
    var newuser = new User({
        email: req.body.email,
        name: req.body.name,
        password: hash,
        repeat_password: password,
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
    // passwordComplexity(complpassword).validate(req.body.password);
    // module.exports = complpassword;
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

router.get('/login', function(req, res){
    res.render('../views/home.ejs', { page: 'login' });
});

router.post('/login', async function(req, res){
    // Validate login
    const { error } = loginValidate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check account
    const accCheck = await User.findOne({email: req.body.email});
    if(!accCheck) return res.status(400).send("Email dont already exists");

    //check password
    const passCheck = await bcrypt.compare(req.body.password, accCheck.password);
    if(!passCheck) return res.status(400).send("Invalid pass!!!");

    res.render('../views/home.ejs', { page: 'chat' });
})

module.exports = router;