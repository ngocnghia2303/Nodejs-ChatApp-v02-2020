const express = require('express');
const app = express();
const http = require('http').Server(app);
const fs = require('fs');

// const http = require('http').Server(app);

const router = express.Router();
const jwt = require('jsonwebtoken');

//Engine Ejs
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.set('views', '../views');
app.use(express.static('../public'));

//body-parser
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
    extended: false
}), bodyParser.json());

//bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

//socket.io
const io = require('socket.io')(http);

//router
const User = require('../models/user_model.js');
const {
    regisValidate,
    loginValidate
} = require('../auth/authen.js');
const checkToken = require('../auth/tokenCheck.js');

//home page
router.get('/', function (req, res) {
    res.render('../views/home.ejs', {
        page: 'choice.ejs'
    });
});

//sign page
router.get('/sign', function (req, res) {
    res.render('../views/home.ejs', {
        page: 'signin.ejs'
    });
});

//register user
router.post('/sign', async function (req, res) {

    //Validate acc 
    //input data for validate acc

    const {
        error
    } = regisValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    //check email in database
    const emailcheck = await User.findOne({
        email: req.body.email
    });
    if (emailcheck) return res.status(400).send("Email already exists");

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
    try {
        const User = await newuser.save();
        console.log("New User registed compelete!!!");
        res.render('../views/home.ejs', {
            page: 'chat'
        });
    } catch (err) {
        console.log("Error =============================> " + err)
        res.status(400).send(err);
    };
});
// passwordComplexity(complpassword).validate(req.body.password);
// module.exports = complpassword;


router.get('/login', function (req, res) {
    res.render('../views/home.ejs', {
        page: 'login'
    });
});

router.post('/login', async function (req, res) {
    // Validate login
    const {
        error
    } = loginValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check account
    const accCheck = await User.findOne({
        email: req.body.email
    });
    if (!accCheck) return res.status(400).send("Email dont already exists");

    //check password
    const passCheck = await bcrypt.compare(req.body.password, accCheck.password);
    if (!passCheck) return res.status(400).send("Invalid pass!!!");

    const token = await jwt.sign({
        _id: accCheck._id
    }, process.env.SECRET_TOKEN, {
        expiresIn: 60 * 60
    });

    // if(token) return console.log("TOKEN is: " + token);
    
    //add token >> when login compelete

    // res.header("authenticate-token", token).send(token);
    if(token) return res.render('../views/home.ejs', { page: 'chat' });

    // res.sendFile(__dirname + '/index.html');
    io.on('connection', function (socket) {

        socket.on('chat message', function (msg) {
            io.emit('chat message', msg);
            console.log('user message ==========>' + (msg))
        });
    });

});


//Demo token
router.get('/token', checkToken, function (req, res) {
    res.send("Welcome my friend!!")
})

module.exports = router;