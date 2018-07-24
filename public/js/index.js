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

socket.on('showLocation', function (message) {
  const li = jQuery('<li></li>')
  const a = jQuery('<a target="_blank">My current location</a>')

  li.text(`${message.user}: `)
  a.attr('href', message.url)
  li.append(a)
  jQuery('#messages').append(li)
});



// Client is Shouting to Server
// Client --data--> Server

//socket.emit('createNewMessage', object, callback)

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  const messageTextbox = jQuery('[name=message]')

  socket.emit('createNewMessage', {
    user: 'USER',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('')
  })
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.')
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...')

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send Location')
    socket.emit('createLocation', {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
  }, function () {
    locationButton.removeAttr('disabled').text('Send Location')
    alert('Unable to fetch location.')
  })

})
