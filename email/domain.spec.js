const { expect } = require('chai');
const domain = require('./domain');

describe('email/domain', () => {

  const validPairs = [
    [ 'john@doe.com', 'doe.com' ],
    [ 'john@doe.com', 'DoE.Com' ],
    [ 'janedoe@google.com', /google/ ],
    [ 'my@you.co.uk', /co.uk$/ ],
    [ 'bill@hotmail.com', /HotMail/i ]
  ];

  const invalidPairs = [
    [ 'larry@gmail.com', 'hotmail.com' ],
    [ 'bill.hotmail.com', /gmail/ ],
    [ 'some@mail.ru', Math.PI ]
  ];

  validPairs.forEach(pair => {
    it(`${pair[0]} has domain ${pair[1]}`, () => {
      expect(domain(pair[0], pair[1])).to.be.true;
    });
  });

  invalidPairs.forEach(pair => {
    it(`${pair[0]} does not have domain ${pair[1]}`, () => {
      expect(domain(pair[0], pair[1])).to.be.false;
    });
  });

});
