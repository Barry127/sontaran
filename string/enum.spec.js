const { expect } = require('chai');
const _enum = require('./enum');

describe('string/enum', () => {

  const validPairs = [
    [ 'Hello', [ 'Hello', 'World' ] ],
    [ 'World', [ 'Hello', 'World' ] ],
    [ 'Bar', [ 'Foo', 'Bar', 'Baz' ] ]
  ];

  const invalidPairs = [
    [ '2', [ 1, 2, 3 ] ],
    [ 'hello', [ 'Hello', 'World' ] ],
    [ 'Hello', 'Hello' ],
    [ [ 1, 2, 3 ], 3 ]
  ];

  validPairs.forEach(pair => {
    it(`${pair[0]} is one of ${pair[1]}`, () => {
      expect(_enum(pair[0], pair[1])).to.be.true;
    });
  });

  invalidPairs.forEach(pair => {
    it(`${pair[0]} is not one of ${pair[1]}`, () => {
      expect(_enum(pair[0], pair[1])).to.be.false;
    });
  });

});
