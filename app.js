const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const chalk = require('chalk');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}), bodyParser.json());
// const http = require('http').Server(app);
// const io = require('socket.io')(http);

const server = require('http').Server(app);

//socket.io 
const io = require('socket.io')(server);

//create socket when have user connect to app
const arrayUser = ['aaa'];
io.on('connection', function (socket) {

    console.log(chalk.blue("Have user connect to app ==============> ") + socket.id);

    socket.on('client-send-email', function (data) {
        if (arrayUser.indexOf(data) >= 0) {
            //login failed
            socket.emit('server-send-login-failed');
        } else {
            //compelete
            console.log(chalk.red(data) + " ============> want to login App");
            arrayUser.push(data);
            console.log(arrayUser)
            socket.emit('server-send-register-succes', data);
            io.emit('server-send-list-user', arrayUser);
        }

    });
    socket.on('disconnect', function () {
        console.log(socket.id + chalk.yellow(" ================> Have user disconnect"));
    });
    // socket.on('client-send-data' , function(data){
    //     console.log(socket.id + " sent data ============> " + data);
    //     io.emit('Server-send-data', data + "XXX Porn 88");
    //     // socket.broadcast.emit('Server-send-data', data + "XXX Porn 88");
    // });


    // socket.on('chat message', function (msg) {
    //     io.emit('chat message', msg);
    //     console.log('user message ==========>' + (msg))
    // });
});

//import routes index1
const router = require('./routes/index2.js');
const indexUser = require('./routes/index2.js');

app.use('/user', indexUser);
app.use('/', router);

//Mongoose
const mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

//connect database
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, function (err) {
    if (err) {
        console.log("Linda Connect Mongo have erros ======>" + err);
    } else {
        console.log("Linda's Mongo Server Connected Successfully ");
    };
});

// route middleware
app.use('/api/user', indexUser);

const port = 3000;
server.listen(port, function () {
    console.log("Loading compelete with " + port);
});