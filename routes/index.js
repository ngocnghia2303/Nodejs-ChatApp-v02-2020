const express = require('express');
const app = express();

const router = express.Router();
const jwt = require('jsonwebtoken');

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
const checkToken = require('../auth/tokenCheck.js');

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
    const salt = await bcrypt.genSalt(saltRounds);
    // hash the password
    const pasHash = await bcrypt.hash(req.body.password, salt);
    const pasRepeatHash = await bcrypt.hash(req.body.pass_repeat, salt);

            // set the hashed password back on our user document
            // newuser.password = hash;
            var status = false;
            if (req.body.alone) {
                status = true;
            };
            var newuser = new User({
                email: req.body.email,
                name: req.body.name,
                password: pasHash,
                // pass_repeat: req.body.pass_repeat,
                pass_repeat: pasRepeatHash,
                address: req.body.address,
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
                const User = await newuser.save();
                console.log("New User registed compelete!!!");
                res.render('../views/home.ejs', { page: 'chat' });
            }catch(err){
                console.log("Error =============================> "+ err)
                res.status(400).send(err);
            };
});
    // passwordComplexity(complpassword).validate(req.body.password);
    // module.exports = complpassword;


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

    // res.render('../views/home.ejs', { page: 'chat' });
    const token = jwt.sign({_id: accCheck._id}, process.env.SECRET_TOKEN, {expiresIn: 60 * 60});
    console.log("TOKEN is: " + token);
    //add token >> header anything
    res.header("authenticate-token", token).send(token);
})

//Demo token
router.get('/token', checkToken, function(req, res){
    res.send("Welcome my friend!!")
})

module.exports = router;