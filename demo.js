

const express = require('express');
const app = require('express')();
// const http = require('http').Server(router);
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.set('views','views/pages')
router .use(express.static('../public'));

var router = express.Router();
// // router.set('view engine', 'ejs');
// // router.set('views', 'views/pages');


// router.get('/nghia', function (req, res) {

 app.get('/nghia', function (req, res) {
  // res.sendFile(__dirname + '/views/pages/index.html');
  res.render('chat.ejs')
});

io.on('connection', function (socket) {

  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
    console.log('user message ====>' + (msg))
  });
});

const port = 4000;
http.listen(port, function () {
  console.log('listening on: ' + port);
});