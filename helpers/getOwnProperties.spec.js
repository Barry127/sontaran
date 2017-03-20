const { expect } = require('chai');
const getOwnProperties = require('./getOwnProperties');
const equals = require('../array/equals');

describe('helpers/getOwnProperties', () => {

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
    [ { foo: 1, bar: 2 }, [ 'foo', 'bar' ] ],
    [ myObjectInstance, [ 'a', 'b', 'c' ] ]
  ];

  const invalidPairs = [
    [ { foo: 1, bar: 2 }, [ 'foo', 'bar', 'baz' ] ],
    [ myObjectInstance, [ 'a', 'b', 'c', 'x', 'y', 'z' ] ],
    [ ['aa'], ['aa'] ],
    [ 'a', ['length'] ],
    [ { foo: 2 }, 'foo' ]
  ];

  validPairs.forEach(pair => {
    it(`${pair[0]} has own properties ${pair[1]}`, () => {
        const properties = getOwnProperties(pair[0]);
        expect(equals(properties, pair[1])).to.be.true;
    });
  });

  invalidPairs.forEach(pair => {
    it(`${pair[0]} does not have own properties ${pair[1]}`, () => {
      const properties = getOwnProperties(pair[0]);
      expect(equals(properties, pair[1])).to.be.false;
    });
  });

});
