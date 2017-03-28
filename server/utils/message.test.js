var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage' , () => {
  it('should generate correct message object' , () =>{
    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from, text);

    expect(message.createAt).toBeA('number');
    expect(message).toInclude({from, text});
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Admin';
    var lat = 15;
    var long = 19;
    var url = 'https://www.google.com/maps?q=15,19';

    var location = generateLocationMessage(from,lat,long);

    expect(location.createAt).toBeA('number');
    expect(location).toInclude({from, url});
  });
} )
