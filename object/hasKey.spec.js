const { expect } = require('chai');
const hasKey = require('./hasKey');

describe('object/hasKey', () => {

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
    [ { foo: 1, bar: 2 }, ['foo'] ],
    [ myObjectInstance, 'c' ]
  ];

  const invalidPairs = [
    [ { foo: 1, bar: 2 }, 'baz' ],
    [ myObjectInstance, 'z' ],
    [ myObjectInstance, 'd' ],
    [ ['aa'], 'aa' ],
    [ 'a', 'length' ],
    [ { '2': 2 }, true ]
  ];

  validPairs.forEach(pair => {
    it(`${pair[0]} has key ${pair[1]}`, () => {
        expect(hasKey(pair[0], pair[1])).to.be.true;
    });
  });

  invalidPairs.forEach(pair => {
    it(`${pair[0]} does not have key ${pair[1]}`, () => {
      expect(hasKey(pair[0], pair[1])).to.be.false;
    });
  });

});
