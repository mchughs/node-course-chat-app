const moment = require('moment');

const generateMessage = (user, text) => {
  return {
    user,
    text,
    timeStamp: moment().valueOf()
  }
}

const generateLocation = (user, lat, lng) => {
  const url = `https://www.google.com/maps?q=${lat},${lng}`

  return {
    user,
    url,
    timeStamp: moment().valueOf()
  }
}

module.exports = {generateMessage, generateLocation}
