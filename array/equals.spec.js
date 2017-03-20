const { expect } = require('chai');
const equals = require('./equals');

describe('array/equals', () => {

  const validPairs = [
    [ [ 1, 2 ], [ 1, 2 ] ],
    [ [ 'a', 'b', 'c' ], [ 'a', 'b', 'c' ] ],
    [ [ 'a', 'b', 'c' ], [ 'b', 'a', 'c' ] ],
    [ [ 1, 2, 3 ], [ 3, 2, 1] ],
    [ [ 255 ], [ 0xFF ] ]
  ];

  const invalidPairs = [
    [ [ 'a', 'b', 'c' ], [ 'a', 'b' ] ],
    [ [ '1', 2 ], [ 1, 2 ] ],
    [ [ { a: 1, b: 2 } ], [ { a: 1, b: 2 } ] ],
    [ 'a', [ 'a', 'b' ] ]
  ];

  validPairs.forEach(pair => {
    it(`${pair[0]} equals ${pair[1]}`, () => {
      expect(equals(pair[0], pair[1])).to.be.true;
    });
  });

  invalidPairs.forEach(pair => {
    it(`${pair[0]} does not equal ${pair[1]}`, () => {
      expect(equals(pair[0], pair[1])).to.be.false;
    });
  });

});
