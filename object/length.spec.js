const { expect } = require('chai');
const length = require('./length');

describe('object/length', () => {

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
    [ { foo: 1, bar: 2 }, 2 ],
    [ myObjectInstance, 3 ],
    [ [ 'a', 'b', 'c' ], 3]
  ];

  const invalidPairs = [
    [ { foo: 1, bar: 2 }, 3 ],
    [ myObjectInstance, 6 ],
    [ ['aa'], 2 ],
    [ 'a', 1 ],
    [ { '2': 2 }, true ]
  ];

  validPairs.forEach(pair => {
    it(`${pair[0]} has length ${pair[1]}`, () => {
        expect(length(pair[0], pair[1])).to.be.true;
    });
  });

  invalidPairs.forEach(pair => {
    it(`${pair[0]} does not have length ${pair[1]}`, () => {
      expect(length(pair[0], pair[1])).to.be.false;
    });
  });

});
