const { expect } = require('chai');
const greaterThan = require('./greaterThan');

describe('number/greaterThan', () => {

  const validPairs = [
    [ 3, 2 ],
    [ -2, -6 ],
    [ 3, Number.NEGATIVE_INFINITY ]
  ];

  const invalidPairs = [
    [ 4, 4 ],
    [ Math.PI, 4 ],
    [ -2, -1 ],
    [ 4, Number.NaN ],
    [ 2, '1' ]
  ];

  validPairs.forEach(pair => {
    it(`${pair[0]} is greater than ${pair[1]}`, () => {
      expect(greaterThan(pair[0], pair[1])).to.be.true;
    });
  });

  invalidPairs.forEach(pair => {
    it(`${pair[0]} is not greater than ${pair[1]}`, () => {
      expect(greaterThan(pair[0], pair[1])).to.be.false;
    });
  });

});
