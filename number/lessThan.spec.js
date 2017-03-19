const { expect } = require('chai');
const lessThan = require('./lessThan');

describe('number/lessThan', () => {

  const validPairs = [
    [ 2, 3 ],
    [ -6, -2 ],
    [ 3, Number.POSITIVE_INFINITY ]
  ];

  const invalidPairs = [
    [ 4, 4 ],
    [ 4, Math.PI ],
    [ -1, -2 ],
    [ 4, Number.NaN ],
    [ 2, '3' ]
  ];

  validPairs.forEach(pair => {
    it(`${pair[0]} is less than ${pair[1]}`, () => {
      expect(lessThan(pair[0], pair[1])).to.be.true;
    });
  });

  invalidPairs.forEach(pair => {
    it(`${pair[0]} is not less than ${pair[1]}`, () => {
      expect(lessThan(pair[0], pair[1])).to.be.false;
    });
  });

});
