const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const {Rooms} = require('./utils/rooms');

var app = express();
var port = process.env.PORT||3000;
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();
var rooms = new Rooms();


io.on('connection', (socket) =>{
  console.log('New user connected');

  io.emit('updateRoomList', rooms.getRoomList());
  console.log(rooms.getRoomList());

  socket.on('join', (params, callback) =>{
    if (!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room name is required');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage',generateMessage('Vu Dai Ca', 'Welcome to the chat '));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin', `${params.name} has joined`));

    rooms.addRoom(params.room);

    callback();
  });

  socket.on('createMessage' , (message, callback) =>{
    var user = users.getUser(socket.id);
    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage',generateMessage(user.name, message.text));
    }
    callback();
  });

  socket.on('CreateLocationMessage', (coords) =>{
    var user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name,coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () =>{
    var user = users.removeUser(socket.id);
    if (user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin' , `${user.name} has been left`));
      if (rooms.getNumberPeopleInRoom(user.room) === 1){
        rooms.deleteRoom(user.room);
        io.emit('updateRoomList', rooms.getRoomList());
      } else {
        rooms.truSoNguoiTrongRoom(user.room);
      }
    };


  });

});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});
