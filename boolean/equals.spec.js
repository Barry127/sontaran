const { expect } = require('chai');
const equals = require('./equals');

describe('boolean/equals', () => {

  const validPairs = [
    [ true, true ],
    [ false, false ]
  ];

  const invalidPairs = [
    [ true, false ],
    [ false, true ],
    [ true, 'true' ],
    [ true, 1 ],
    [ false, -1 ],
    [ false, 0 ],
    [ false, 'false' ]
  ];

  validPairs.forEach(pair => {
    it(`${pair[0]} equals ${pair[1]}`, () => {
      expect(equals(pair[0], pair[1])).to.be.true;
    });
  });

  invalidPairs.forEach(pair => {
    it(`${pair[0]} equals ${pair[1]}`, () => {
      expect(equals(pair[0], pair[1])).to.be.false;
    });
  });

});
