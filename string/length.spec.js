const { expect } = require('chai');
const length = require('./length');

describe('string/length', () => {

  const validPairs = [
    [ 'Hello World', 11 ],
    [ 'Hello', 5 ],
    [ 'Hello ', 6 ],
    [ '01', 0x02 ]
  ];

  const invalidPairs = [
    [ 'Hello World', 12 ],
    [ 'Hello', Number.NaN ],
    [ 'Hello World', '11' ],
    [ [ 1, 2, 3 ], 3 ]
  ];

  validPairs.forEach(pair => {
    it(`${pair[0]} has length ${pair[1]}`, () => {
      expect(length(pair[0], pair[1])).to.be.true;
    });
  });

  invalidPairs.forEach(pair => {
    it(`${pair[0]} does not have length ${pair[1]}`, () => {
      expect(length(pair[0], pair[1])).to.be.false;
    });
  });

});
