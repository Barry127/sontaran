const { expect } = require('chai');
const _of = require('./of');

describe('array/of', () => {

  const validPairs = [
    [ [ 'a', 'b', 'c' ], 'string' ],
    [ [ 1, 2, 3, 0xFF ], 'number' ],
    [ [ {}, {} ], 'object' ],
    [ [ true, true, false ], 'boolean' ],
    [ [ [], [], [] ], 'array' ],
    [ [ [], [], [] ], 'object' ]
  ];

  const invalidPairs = [
    [ [ 'a', 'b', 'c' ], 'number' ],
    [ [ 'a', 'b', 2 ], 'string' ],
    [ 'abc', 'string' ],
    [ [ 0, true ], 'boolean' ],
    [ [ {}, [] ], 'array' ],
    [ [ 1, 2, 3 ], 'integer' ],
    [  [3, 3, 3 ], 3 ]
  ];

  validPairs.forEach(pair => {
    it(`${pair[0]} is an array of ${pair[1]}`, () => {
      expect(_of(pair[0], pair[1])).to.be.true;
    });
  });

  invalidPairs.forEach(pair => {
    it(`${pair[0]} is not an array of ${pair[1]}`, () => {
      expect(_of(pair[0], pair[1])).to.be.false;
    });
  });

});
