const { expect } = require('chai');
const length = require('./length');

describe('array/length', () => {

  const validPairs = [
    [ [ 'a', 'b', 'c' ], 3 ],
    [ [ 'a', 'b', 'c', 'd' ], 4 ],
    [ [ 1 ], 1 ],
    [ [ 255, 333 ], 0x02 ]
  ];

  const invalidPairs = [
    [ [ 'a', 'b', 'c' ], 2 ],
    [ [ 'a', 'b', 'c' ], '3' ],
    [ [ 1, 2 ,3 ], Number.NaN ],
    [ 'abc', 3 ]
  ];

  validPairs.forEach(pair => {
    it(`${pair[0]} has length ${pair[1]}`, () => {
      expect(length(pair[0], pair[1])).to.be.true;
    });
  });

  invalidPairs.forEach(pair => {
    it(`${pair[0]} has not length ${pair[1]}`, () => {
      expect(length(pair[0], pair[1])).to.be.false;
    });
  });

});
