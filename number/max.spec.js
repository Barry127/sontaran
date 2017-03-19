const { expect } = require('chai');
const max = require('./max');

describe('number/max', () => {

  const validPairs = [
    [ 2, 3 ],
    [ 4, 4 ],
    [ -6, -2 ],
    [ 3, Number.POSITIVE_INFINITY ]
  ];

  const invalidPairs = [
    [ Math.PI, 3 ],
    [ -1, -2 ],
    [ 4, Number.NaN ],
    [ 2, '4' ]
  ];

  validPairs.forEach(pair => {
    it(`${pair[0]} is not greater than ${pair[1]}`, () => {
      expect(max(pair[0], pair[1])).to.be.true;
    });
  });

  invalidPairs.forEach(pair => {
    it(`${pair[0]} is greater than ${pair[1]}`, () => {
      expect(max(pair[0], pair[1])).to.be.false;
    });
  });

});
