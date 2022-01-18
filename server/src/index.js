const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');

const PORT = process.env.port || 4000;

const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  socket.on('log', (data) => console.log(data));
  //Welcome current user
  socket.emit('message', 'Welcome user');

  //broadcast t0 everyone except the user
  socket.broadcast.emit('message', 'A user has joined');

  //when user disconnects
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left');
  });
});

server.listen(4000, () => console.log('aye'));
