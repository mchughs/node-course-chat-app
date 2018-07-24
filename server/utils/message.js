const generateMessage = (user, text) => {
  return {
    user,
    text,
    timeStamp: new Date().getTime()
  }
}

module.exports = {generateMessage}
