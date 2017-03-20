const { expect } = require('chai');
const isSuperset = require('./isSuperset');

describe('object/isSuperset', () => {

  const validPairs = [
    [ { a: 1, b: 2 }, { a: 1, b: 2 } ],
    [ { a: 1, b: 2, c: 3, d: 4 }, { a: 1, b: 2, c: 3 } ],
    [ { a: 1, b: 2, c: 3 }, { b: 2, a: 1, c: 3 } ],
    [ [ 1, 2, 3 ], [ 1, 2, 3 ] ],
    [ { a: 0xFF, b: 0xFE, c: 0xFD }, { a: 255 } ]
  ];

  const invalidPairs = [
    [ { a: 1, b: 2 }, { a: 1, b: 2, c: 3 } ],
    [ { a: '1', b: 2 }, { a: 1, b: 2 } ],
    [ { foo: { bar: 'baz' } } , { foo: { bar: 'baz' } } ],
    [ { a: 'a' }, 'a' ],
    [ [ 1, 2, 3 ], [ 3, 2, 1 ] ]
  ];

  validPairs.forEach(pair => {
    it(`${pair[0]} is a superset of ${pair[1]}`, () => {
      expect(isSuperset(pair[0], pair[1])).to.be.true;
    });
  });

  invalidPairs.forEach(pair => {
    it(`${pair[0]} is not a superset of ${pair[1]}`, () => {
      expect(isSuperset(pair[0], pair[1])).to.be.false;
    });
  });

});
