const { expect } = require('chai');
const name = require('./name');

describe('email/name', () => {

  const validPairs = [
    [ 'john@doe.com', 'john' ],
    [ 'janedoe@google.com', /jane/ ],
    [ 'my-check@you.co.uk', /check$/ ],
    [ 'bill@hotmail.com', /Bill/i ]
  ];

  const invalidPairs = [
    [ 'john@doe.com', 'JoHn' ],
    [ 'larry@gmail.com', 'sergei' ],
    [ 'bill@hotmail.com', /steve/ ],
    [ 'some@mail.ru', Math.PI ]
  ];

  validPairs.forEach(pair => {
    it(`${pair[0]} has name ${pair[1]}`, () => {
      expect(name(pair[0], pair[1])).to.be.true;
    });
  });

  invalidPairs.forEach(pair => {
    it(`${pair[0]} does not have name ${pair[1]}`, () => {
      expect(name(pair[0], pair[1])).to.be.false;
    });
  });

});
