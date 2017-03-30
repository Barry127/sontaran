const { expect } = require('chai');
const equals = require('./equals');

describe('string/equals', () => {

  const validPairs = [
    [ 'Hello World', 'Hello World' ],
    [ 'FooBar', 'FooBar' ],
    [ '♠♣♥♦', '♠♣♥♦' ],
    [ 'Woohoo', `Woohoo` ]
  ];

  const invalidPairs = [
    [ 'Hello World', 'Hello world' ],
    [ 'Hello World', 'Hello World ' ],
    [ '4', 4 ],
    [ [ 1, 2, 3 ], [ 1, 2, 3 ] ]
  ];

  validPairs.forEach(pair => {
    it(`${pair[0]} equals ${pair[1]}`, () => {
      expect(equals(pair[0], pair[1])).to.be.true;
    });
  });

  invalidPairs.forEach(pair => {
    it(`${pair[0]} does not contain ${pair[1]}`, () => {
      expect(equals(pair[0], pair[1])).to.be.false;
    });
  });

});
