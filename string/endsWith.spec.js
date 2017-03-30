const { expect } = require('chai');
const endsWith = require('./endsWith');

describe('string/endsWith', () => {

  const validPairs = [
    [ 'Hello World', 'World' ],
    [ 'Hello World', 'ld' ],
    [ 'FooBar', 'Bar' ]
  ];

  const invalidPairs = [
    [ 'Hello World', 'Hello' ],
    [ 'Hello World', 'World ' ],
    [ 'FooBar', 'bar' ],
    [ 'FooBar2', 2 ],
    [ [ 1, 2, 3 ], 3 ]
  ];

  validPairs.forEach(pair => {
    it(`${pair[0]} ends with ${pair[1]}`, () => {
      expect(endsWith(pair[0], pair[1])).to.be.true;
    });
  });

  invalidPairs.forEach(pair => {
    it(`${pair[0]} does not end with ${pair[1]}`, () => {
      expect(endsWith(pair[0], pair[1])).to.be.false;
    });
  });

});
