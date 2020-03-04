const express = require('express');
const app = express();
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }), bodyParser.json());

const port = 3000;

//import routes
const router = require('./routes/index.js');
const indexUser = require('./routes/index.js');

app.use('/user',indexUser);
app.use('/', router);

//Mongoose
var mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

//connect database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, function (err) {
    if (err) {
        console.log("Linda Connect Mongo have erros: " + err);
    } else {
        console.log("Linda's Mongo Server Connected Successfully ");
    };
});



// route middleware

app.use('/api/user', indexUser);

app.listen(port, function(){
    console.log('Server listening port compelete '+ port)
});