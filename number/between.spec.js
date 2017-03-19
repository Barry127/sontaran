const { expect } = require('chai');
const between = require('./between');

describe('number/between', () => {

  const validPairs = [
    [ 4, 3, 5 ],
    [ -2, -5, -1 ],
    [ 6, 0 , Number.POSITIVE_INFINITY ],
    [ Math.PI, 3, 4 ]
  ];

  const invalidPairs = [
    [ 4, 5, 3 ],
    [ 3, 3, 5 ],
    [ 3, '2', 4],
    [ 2, 0, Number.NaN ],
    [ Number.NaN, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY ]
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
