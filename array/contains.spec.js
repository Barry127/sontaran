const { expect } = require('chai');
const contains = require('./contains');

describe('array/contains', () => {

  const validPairs = [
    [ [ 'a', 'b', 'c' ], 'b' ],
    [ [ 'a', 'b', 'c' ], 'a' ],
    [ [ 1, 2, 3 ], 2 ],
    [ [ 255, 333 ], 0xFF ]
  ];

  const invalidPairs = [
    [ [ 'a', 'b', 'c' ], 'A' ],
    [ [ 'a', 'b', 'c' ], 'd' ],
    [ 'abc', 'c' ]
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
