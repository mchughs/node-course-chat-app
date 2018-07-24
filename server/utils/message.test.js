const expect = require('expect');

const {generateMessage, generateLocation} = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object.', () => {
    const user = 'Alice'
    const text = 'Hi Bob!'
    const message = generateMessage(user, text)

    expect(message.timeStamp).toBeA('number')
    expect(message).toInclude({user, text})
  })
})

describe('generateLocation', () => {
  it('should generate correct location object.', () => {
    const user = 'Admin'
    const lat = 15
    const lng = 30
    const loc = generateLocation(user, lat, lng)
    const url = `https://www.google.com/maps?q=15,30`

    expect(loc.timeStamp).toBeA('number')
    expect(loc).toInclude({user, url})
  })
})
