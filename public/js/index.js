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
  const formattedTime = moment(message.timeStamp).format('h:mm a')
  var template = jQuery('#message-template').html()
  var html = Mustache.render(template, {
    user: message.user,
    text: message.text,
    timeStamp: formattedTime
  })

  jQuery('#messages').append(html)
});

socket.on('showLocation', function (message) {
  const formattedTime = moment(message.timeStamp).format('h:mm a')
  var template = jQuery('#location-message-template').html()
  var html = Mustache.render(template, {
    user: message.user,
    url: message.url,
    timeStamp: formattedTime
  })
  
  jQuery('#messages').append(html)
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
