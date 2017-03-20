const { expect } = require('chai');
const hasKeys = require('./hasKeys');

describe('object/hasKeys', () => {

  const myObject = function () {
    return {
      a: 1,
      b: 2,
      c: 3
    };
  };

  myObject.prototype.x = 24;
  myObject.prototype.y = 25;
  myObject.prototype.z = 26;

  const myObjectInstance = new myObject();

  const validPairs = [
    [ { foo: 1, bar: 2 }, ['foo', 'bar' ] ],
    [ myObjectInstance, ['c'] ],
    [ myObjectInstance, ['a', 'c'] ]
  ];

  const invalidPairs = [
    [ { foo: 1, bar: 2 }, [ 'foo', 'baz' ] ],
    [ myObjectInstance, ['z'] ],
    [ myObjectInstance, [ 'a', 'z'] ],
    [ ['aa'], ['aa'] ],
    [ 'a', ['length'] ],
    [ { '2': 2 }, true ]
  ];

  validPairs.forEach(pair => {
    it(`${pair[0]} has keys ${pair[1]}`, () => {
        expect(hasKeys(pair[0], pair[1])).to.be.true;
    });
  });

  invalidPairs.forEach(pair => {
    it(`${pair[0]} does not have keys ${pair[1]}`, () => {
      expect(hasKeys(pair[0], pair[1])).to.be.false;
    });
  });

});
