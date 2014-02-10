var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var OX = require('./ox');

server.listen(3000);



app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

var games = new Object();

io.sockets.on('connection', function (socket) {

    socket.on('requestGame', function (data) { OX.requestGame(games, socket); });

    socket.on('createGame', function (data) { OX.createGame(games, socket); });

    socket.on('move', function (data) { OX.dispatchMove(games, socket, data); });

});