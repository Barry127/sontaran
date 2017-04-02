const { expect } = require('chai');
const equals = require('./equals');

describe('object/equals', () => {

  const myObject = function () {
    this.a = 1;
    this.b = 2;
    this.c = 3;

    return this;
  };

  myObject.prototype.x = 24;
  myObject.prototype.y = 25;
  myObject.prototype.z = 26;

  const myObjectInstance = new myObject();

  const validPairs = [
    [ { foo: 'bar' }, { foo: 'bar' } ],
    [ myObjectInstance, { a: 1, b: 2, c: 3 } ],
    [ [1, 2 ], [ 1, 2] ],
    [ { a: 1, b: 2 }, { b: 2, a: 1 } ],
    [ { a: 255 }, { a: 0xFF } ]
  ];

  const invalidPairs = [
    [ { foo: 'bar' }, { foo: 'bar', 'baz': 'quux' } ],
    [ myObjectInstance, { a: 1, b: 2, c: 3, x: 24, y: 25, z:26 } ],
    [ [ 1, 2 ], [ 2, 1 ] ],
    [ 'a', [ 'a' ] ],
    [ { '2': 2 }, true ],
    [ { a: 1 }, { a: '1' } ],
    [ { foo: { bar: 'baz' } }, { foo: { bar: 'baz' } } ]
  ];

  validPairs.forEach(pair => {
    it(`${pair[0]} equals ${pair[1]}`, () => {
        expect(equals(pair[0], pair[1])).to.be.true;
    });
  });

  invalidPairs.forEach(pair => {
    it(`${pair[0]} does not equal ${pair[1]}`, () => {
      expect(equals(pair[0], pair[1])).to.be.false;
    });
  });

});
