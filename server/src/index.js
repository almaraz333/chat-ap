const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const formatMessage = require('./utils/formatMessage');
const {
  userJoins,
  getCurrentUser,
  userLeaves,
  getRoomUsers
} = require('./utils/users');

const PORT = process.env.port || 4000;

const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  socket.on('join', ({ userName, roomId }) => {
    const user = userJoins(socket.id, userName, roomId);

    socket.join(user.roomId);

    //Welcome current user
    socket.emit('message', formatMessage('Bot', `Welcome, ${user.userName}!`));

    //broadcast to everyone except the user
    socket.broadcast
      .to(user.roomId)
      .emit(
        'message',
        formatMessage('Bot', `${user.userName} has joined the room!`)
      );

    socket.emit('roomUsers', getRoomUsers(user.roomId));
  });

  socket.on('message', (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.roomId).emit('message', formatMessage(user.userName, msg));
  });

  //when user disconnects
  socket.on('disconnect', () => {
    const user = userLeaves(socket.id);

    io.emit('message', formatMessage('Bot', `${user.userName} has left`));
  });
});

server.listen(PORT, () => console.log(`Running on port ${PORT}`));
