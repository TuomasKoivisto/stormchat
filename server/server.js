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

  socket.on('welcomeText', () => {
    socket.emit('sendWelcomeText', generateMessage('Admin', 'Welcome to StormChat', ''));
  });

  socket.on('connect', () => {
    socket.emit('sendWelcomeText', generateMessage('Admin', 'Welcome to StormChat', ''));
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
    var check = rooms.checkUserName(userObject);
    if (check === 'not taken') {
      rooms.addUser(userObject.roomname, userObject.username);
      socket.emit('nameNotTaken');
    } else {
      socket.emit('nameTaken');
    }

  });

  socket.on('refreshUsers', (room) => {
    io.emit('sendUserList', rooms.getUsers(room))
  })

  socket.on('newUser', data => {
    io.emit('NewUserJoined', generateMessage(data.user, data.user + ' joined the room', data.room)
    )
  })

  socket.on('leaveRoom', user => {
    rooms.removeUser(user);
    io.emit('sendUserList', rooms.getUsers(user.room));
});

  socket.on('createMessage', (message, callback) => {
    io.emit('newMessage', generateMessage(message.from, message.text, message.room));
    callback('this is from the server');
  });

});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
