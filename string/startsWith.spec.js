const { expect } = require('chai');
const startsWith = require('./startsWith');

describe('string/startsWith', () => {

  const validPairs = [
    [ 'Hello World', 'Hello' ],
    [ 'Hello World', 'He' ],
    [ 'FooBar', 'Foo' ]
  ];

  const invalidPairs = [
    [ 'Hello World', 'World' ],
    [ 'Hello World', ' Hello' ],
    [ 'FooBar', 'foo' ],
    [ '2FooBar', 2 ],
    [ [ 1, 2, 3 ], 1 ]
  ];

  validPairs.forEach(pair => {
    it(`${pair[0]} ends with ${pair[1]}`, () => {
      expect(startsWith(pair[0], pair[1])).to.be.true;
    });
  });

  invalidPairs.forEach(pair => {
    it(`${pair[0]} does not end with ${pair[1]}`, () => {
      expect(startsWith(pair[0], pair[1])).to.be.false;
    });
  });

});
