const { expect } = require('chai');
const between = require('./between');

describe('string/between', () => {

  const validPairs = [
    [ 'Hello', 4, 6 ],
    [ 'Hi' , 1, 3 ],
    [ 'Hello World!', 0 , Number.POSITIVE_INFINITY ],
    [ 'Foo', 3, 4 ],
    [ 'This is always true' , Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY ]
  ];

  const invalidPairs = [
    [ 'Hello', 6, 4 ],
    [ 'Hi', 3, 5 ],
    [ 'Foo', '2', 4],
    [ 'Awesome', 0, Number.NaN ],
    [ true, 3, 4 ]
  ];

  validPairs.forEach(pair => {
    it(`${pair[0]} has length between ${pair[1]} and ${pair[2]}`, () => {
      expect(between(pair[0], pair[1], pair[2])).to.be.true;
    });
  });

  invalidPairs.forEach(pair => {
    it(`${pair[0]} does not have length between ${pair[1]} and ${pair[2]}`, () => {
      expect(between(pair[0], pair[1], pair[2])).to.be.false;
    });
  });

});
