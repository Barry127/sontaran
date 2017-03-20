const { expect } = require('chai');
const isSubset = require('./isSubset');

describe('array/isSubset', () => {

  const validPairs = [
    [ [ 1, 2 ], [ 1, 2 ] ],
    [ [ 'a', 'b', 'c' ], [ 'a', 'b', 'c', 'd' ] ],
    [ [ 'a', 'b', 'c' ], [ 'b', 'a', 'c' ] ],
    [ [ 1, 2, 3 ], [ 5, 4, 3, 2, 1] ],
    [ [ 255 ], [ 0xFF, 0xFE, 0xFD ] ]
  ];

  const invalidPairs = [
    [ [ 'a', 'b', 'c' ], [ 'a', 'b' ] ],
    [ [ '1', 2 ], [ 1, 2 ] ],
    [ [ { a: 1, b: 2 } ], [ { a: 1, b: 2 } ] ],
    [ 'a', [ 'a', 'b' ] ]
  ];

  validPairs.forEach(pair => {
    it(`${pair[0]} is a subset of ${pair[1]}`, () => {
      expect(isSubset(pair[0], pair[1])).to.be.true;
    });
  });

  invalidPairs.forEach(pair => {
    it(`${pair[0]} is not a subset of ${pair[1]}`, () => {
      expect(isSubset(pair[0], pair[1])).to.be.false;
    });
  });

});
