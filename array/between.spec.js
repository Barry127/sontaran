const { expect } = require('chai');
const between = require('./between');

describe('array/between', () => {

  const validPairs = [
    [ [ 'a', 'b', 'c', 'd' ], 3, 5 ],
    [ [ 'a', 'b' ] , 1, 3 ],
    [ [ 1, 2, 3, 4, 5, 6 ], 0 , Number.POSITIVE_INFINITY ],
    [ [ 'a', 'b', 'c' ], 3, 4 ],
    [ [ 1 ] , Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY ]
  ];

  const invalidPairs = [
    [ [ 'a', 'b', 'c', 'd' ], 5, 3 ],
    [ [ 'a', 'b' ], 3, 5 ],
    [ [ 1, 2, 3 ], '2', 4],
    [ [ 1, 2 ], 0, Number.NaN ],
    [ true, 3, 4 ]
  ];

  validPairs.forEach(pair => {
    it(`${pair[0]} is between ${pair[1]} and ${pair[2]}`, () => {
      expect(between(pair[0], pair[1], pair[2])).to.be.true;
    });
  });

  invalidPairs.forEach(pair => {
    it(`${pair[0]} is not between ${pair[1]} and ${pair[2]}`, () => {
      expect(between(pair[0], pair[1], pair[2])).to.be.false;
    });
  });

});
