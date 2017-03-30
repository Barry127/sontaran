const { expect } = require('chai');
const min = require('./min');

describe('string/min', () => {

  const validPairs = [
    [ 'Hello World', 1 ],
    [ 'Hello', 5 ],
    [ 'd', Number.NEGATIVE_INFINITY ],
    [ '01', 0o01 ]
  ];

  const invalidPairs = [
    [ 'Hello World', 20 ],
    [ 'Hello', Number.NaN ],
    [ 'Hello World', '11' ],
    [ [ 1, 2, 3 ], 2 ]
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
