const { expect } = require('chai');
const contains = require('./contains');

describe('string/contains', () => {

  const validPairs = [
    [ 'Hello World', 'Hello' ],
    [ 'Hello World', 'World' ],
    [ 'Hello World', 'o W' ]
  ];

  const invalidPairs = [
    [ 'Hello World', 'hello' ],
    [ 'Hello World', 'World ' ],
    [ 'Hello World', 'Earth' ],
    [ [ 1, 2, 3 ], 3 ]
  ];

  validPairs.forEach(pair => {
    it(`${pair[0]} contains ${pair[1]}`, () => {
      expect(contains(pair[0], pair[1])).to.be.true;
    });
  });

  invalidPairs.forEach(pair => {
    it(`${pair[0]} does not contain ${pair[1]}`, () => {
      expect(contains(pair[0], pair[1])).to.be.false;
    });
  });

});
