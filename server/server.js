const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('new user connected')

  // Server is Listening to Client
  // Server <--data-- Client
  socket.on('disconnect', () => {
    console.log('user was disconnected')
  })

  socket.on('createNewMessage', (message) => {
    console.log('Message created', message)
    io.emit('showNewMessage', {
      user: message.user,
      text: message.text,
      timeStamp: new Date().getTime()
    })
  })

  // Server is Shouting to Client
  // Server --data--> Client

})

server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
