const { expect } = require('chai');
const min = require('./min');

describe('object/min', () => {

  const validPairs = [
    [ { a: 1, b: 2, c: 3 }, 2 ],
    [ { a: 1, b: 2, c: 3, d: 4 }, 4 ],
    [ [ 1 ], 1 ],
    [ { a: 255, b: 333 }, 0x00 ]
  ];

  const invalidPairs = [
    [ { a: 1, b: 2, c: 3 }, 4 ],
    [ { a: 1, b: 2, c: 3 }, '3' ],
    [ { a: 1, b: 2, c: 3 }, Number.NaN ],
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
