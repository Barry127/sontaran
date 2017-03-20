const { expect } = require('chai');
const min = require('./min');

describe('array/min', () => {

  const validPairs = [
    [ [ 'a', 'b', 'c' ], 2 ],
    [ [ 'a', 'b', 'c', 'd' ], 4 ],
    [ [ 1 ], 1 ],
    [ [ 255, 333 ], 0x00 ]
  ];

  const invalidPairs = [
    [ [ 'a', 'b', 'c' ], 4 ],
    [ [ 'a', 'b', 'c' ], '3' ],
    [ [ 1, 2 ,3 ], Number.NaN ],
    [ 'abc', 3 ]
  ];

  validPairs.forEach(pair => {
    it(`${pair[0]} has a min length of ${pair[1]}`, () => {
      expect(min(pair[0], pair[1])).to.be.true;
    });
  });

  invalidPairs.forEach(pair => {
    it(`${pair[0]} length is less than ${pair[1]}`, () => {
      expect(min(pair[0], pair[1])).to.be.false;
    });
  });

});
