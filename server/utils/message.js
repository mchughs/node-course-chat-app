const generateMessage = (user, text) => {
  return {
    user,
    text,
    timeStamp: new Date().getTime()
  }
}

const generateLocation = (user, lat, lng) => {
  const url = `https://www.google.com/maps?q=${lat},${lng}`

  return {
    user,
    url,
    timeStamp: new Date().getTime()
  }
}

module.exports = {generateMessage, generateLocation}
