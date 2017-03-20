const { expect } = require('chai');
const max = require('./max');

describe('array/max', () => {

  const validPairs = [
    [ [ 'a', 'b', 'c' ], 5 ],
    [ [ 'a', 'b', 'c', 'd' ], 4 ],
    [ [ 1 ], 1 ],
    [ [ 255, 333 ], 0xFF ]
  ];

  const invalidPairs = [
    [ [ 'a', 'b', 'c' ], 2 ],
    [ [ 'a', 'b', 'c' ], '3' ],
    [ [ 1, 2 ,3 ], Number.NaN ],
    [ 'abc', 3 ]
  ];

  validPairs.forEach(pair => {
    it(`${pair[0]} has a max length of ${pair[1]}`, () => {
      expect(max(pair[0], pair[1])).to.be.true;
    });
  });

  invalidPairs.forEach(pair => {
    it(`${pair[0]} length is greater than ${pair[1]}`, () => {
      expect(max(pair[0], pair[1])).to.be.false;
    });
  });

});
