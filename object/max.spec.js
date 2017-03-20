const { expect } = require('chai');
const max = require('./max');

describe('object/max', () => {

  const validPairs = [
    [ { a: 1, b: 2, c: 3 }, 5 ],
    [ { a: 1, b: 2, c: 3, d: 4 }, 4 ],
    [ [ 1 ], 1 ],
    [ { a: 255, b: 333 }, 0xFF ]
  ];

  const invalidPairs = [
    [ { a: 1, b: 2, c: 3 }, 2 ],
    [ { a: 1, b: 2, c: 3 }, '3' ],
    [ { a: 1, b: 2, c: 3 }, Number.NaN ],
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
