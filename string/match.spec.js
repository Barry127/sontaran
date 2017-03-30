const { expect } = require('chai');
const match = require('./match');

describe('string/match', () => {

  const validPairs = [
    [ 'hello world', /^[a-z ]+$/ ],
    [ 'Hello World', /hello/i ]
  ];

  const invalidPairs = [
    [ 'Hello World', 'Hello' ],
    [ 'Hello World', { hello: 'Hello' } ],
    [ 'Hello World', /^[a-z ]+$/ ],
    [ 3, /[0-9]/ ]
  ];

  validPairs.forEach(pair => {
    it(`${pair[0]} matches ${pair[1]}`, () => {
      expect(match(pair[0], pair[1])).to.be.true;
    });
  });

  invalidPairs.forEach(pair => {
    it(`${pair[0]} does not match ${pair[1]}`, () => {
      expect(match(pair[0], pair[1])).to.be.false;
    });
  });

});
