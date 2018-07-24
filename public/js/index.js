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
  const li = jQuery('<li></li>')
  li.text(`${message.user}: "${message.text}"`)

  jQuery('#messages').append(li)
});

// Client is Shouting to Server
// Client --data--> Server

//socket.emit('createNewMessage', object, callback)

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createNewMessage', {
    user: 'USER',
    text: jQuery('[name=message]').val()
  }, function () {

  })
});
