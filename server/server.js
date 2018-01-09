const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');
const { Users } = require('./utils/users');
const { Rooms } = require('./utils/rooms');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();
var rooms = new Rooms();

app.use(express.static(publicPath));

io.on('connection', socket => {
  socket.on('addRoom', room => {
    rooms.addRoom(room.name, room.password);
  });

  socket.emit('listRooms', rooms.rooms);

  socket.on('listRooms', () => {
    io.emit('listRooms', rooms.rooms);
  });

  socket.on('checkPassword', room => {
    var access = rooms.checkPassword(room.name, room.password);
    socket.emit('passwordResult', access);
  });

  socket.on('nameSelected', userObject => {
    rooms.addUser(userObject.roomname, userObject.username);
  });

  socket.on('refreshUsers', (room) => {
    io.emit('sendUserList', rooms.getUsers(room))
  })

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to StormChat'));

  socket.broadcast.emit(
    'newMessage',
    generateMessage('Admin', 'New user joined')
  );

  socket.on('createMessage', (message, callback) => {
    io.emit('newMessage', generateMessage(message.from, message.text, message.room));
    callback('this is from the server');
  });

  socket.on('disconnect', () => {
    console.log('user disconnected from server');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
