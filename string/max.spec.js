const { expect } = require('chai');
const max = require('./max');

describe('string/max', () => {

  const validPairs = [
    [ 'Hello World', 20 ],
    [ 'Hello', 5 ],
    [ 'd', Number.POSITIVE_INFINITY ],
    [ '01', 0xFF ]
  ];

  const invalidPairs = [
    [ 'Hello World', 10 ],
    [ 'Hello', Number.NaN ],
    [ 'Hello World', '11' ],
    [ [ 1, 2, 3 ], 4 ]
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
