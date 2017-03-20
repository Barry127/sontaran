const { expect } = require('chai');
const contains = require('./contains');

describe('object/contains', () => {

  const validPairs = [
    [ { a: 1, b: 2, c: 3 }, 3 ],
    [ { a: 1, b: 2, c: 3 }, 1 ],
    [ { foo: 'bar' }, 'bar' ],
    [ { a: 255, b: 333 }, 0xFF ],
    [ [ 'aa' ], 'aa' ]
  ];

  const invalidPairs = [
    [ { a: 1, b: 2, c: 3 }, 4 ],
    [ { a: 1, b: 2, c: 3 }, '3' ],
    [ { foo: { bar: 'baz' } }, { bar: 'baz' } ],
    [ 'string', 's' ]
  ];

  validPairs.forEach(pair => {
    it(`${pair[0]} contains ${pair[1]}`, () => {
      expect(contains(pair[0], pair[1])).to.be.true;
    });
  });

  invalidPairs.forEach(pair => {
    it(`${pair[0]} does not contain ${pair[1]}`, () => {
      expect(contains(pair[0], pair[1])).to.be.false;
    });
  });

});
