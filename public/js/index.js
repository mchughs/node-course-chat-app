var socket = io()

// Client is Listening to Server
// Client <--data-- Server
socket.on('connect', function () {
  console.log('connected to server')
})

socket.on('disconnect', function () {
  console.log('disconnected from server')
})

socket.on('showNewMessage', function (message) {
  console.log(`new message "${message.text}" post by ${message.user} at time ${message.timeStamp}!`)
})

// Client is Shouting to Server
// Client --data--> Server
