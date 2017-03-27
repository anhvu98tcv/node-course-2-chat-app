const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
var app = express();
var port = process.env.PORT||3000;
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) =>{
  console.log('New user connected');

  socket.on('disconnect', () =>{
    console.log('User was disconnected');
  });
});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});
