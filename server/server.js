const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app)
var io = socketIO(server)

const {generateMessage, generateLocation} = require('./utils/message');

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('new user connected')

  // Server is Listening to Client
  // Server <--data-- Client
  socket.on('disconnect', () => {
    console.log('user was disconnected')
  })

  socket.on('createNewMessage', (message, callback) => {
    console.log('Message created', message)
    callback()
    io.emit('showNewMessage', generateMessage(message.user, message.text))
  })

  socket.on('createLocation', (coords) => {
    io.emit('showLocation', generateLocation('Admin', coords.lat, coords.lng))    
  })

  // Server is Shouting to Client
  // Server --data--> Client
  socket.emit('showNewMessage',
    generateMessage('Admin','Welcome to the chat app.')
  )

  socket.broadcast.emit('showNewMessage',
    generateMessage('Admin', 'New user has joined the chatroom.')
  )

})

server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
