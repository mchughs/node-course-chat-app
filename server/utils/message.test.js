const expect = require('expect');

const {generateMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object.', () => {
    const user = 'Alice'
    const text = 'Hi Bob!'
    const message = generateMessage(user, text)

    expect(message.timeStamp).toBeA('number')
    expect(message).toInclude({user, text})
  })
})
