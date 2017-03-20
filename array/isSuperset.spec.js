const { expect } = require('chai');
const isSuperset = require('./isSuperset');

describe('array/isSuperset', () => {

  const validPairs = [
    [ [ 1, 2 ], [ 1, 2 ] ],
    [ [ 'a', 'b', 'c', 'd' ], [ 'a', 'b', 'c' ] ],
    [ [ 'a', 'b', 'c' ], [ 'b', 'a', 'c' ] ],
    [ [ 5, 4, 3, 2, 1], [ 1, 2, 3 ] ],
    [ [ 0xFF, 0xFE, 0xFD ], [ 255 ] ]
  ];

  const invalidPairs = [
    [ [ 'a', 'b' ], [ 'a', 'b', 'c' ] ],
    [ [ '1', 2 ], [ 1, 2 ] ],
    [ [ { a: 1, b: 2 } ], [ { a: 1, b: 2 } ] ],
    [ [ 'a', 'b' ], 'a' ]
  ];

  validPairs.forEach(pair => {
    it(`${pair[0]} is a superset of ${pair[1]}`, () => {
      expect(isSuperset(pair[0], pair[1])).to.be.true;
    });
  });

  invalidPairs.forEach(pair => {
    it(`${pair[0]} is not a superset of ${pair[1]}`, () => {
      expect(isSuperset(pair[0], pair[1])).to.be.false;
    });
  });

});
