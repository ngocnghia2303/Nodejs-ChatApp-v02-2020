var express = require('express');
var app = express();
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }), bodyParser.json());


const port = 3000;

//Engine Ejs
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.set('views', './views');

//import routes
const indexUser = require("./routes/index");

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

//connect database
mongoose.connect('mongodb+srv://ngocnghia:nghiadeptrai@khoa-pham2020-buqro.gcp.mongodb.net/ChatApp-LindaHTV?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, function (err) {
    if (err) {
        console.log("Linda Connect Mongo have erros: " + err);
    } else {
        console.log("Linda's Mongo Server Connected Successfully ");
    };
});

app.get('/', function(req, res){
    res.render('home.ejs', { page: 'choice'});
});

app.get('/sign', function (req, res) {
    res.render('home.ejs', { page: 'signin' });
});

//route middleware
// app.use('/api/user', indexUser);

app.listen(port, function(){console.log('Server listening port compelete '+ port)});