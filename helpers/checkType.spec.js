const { expect } = require('chai');
const checkType = require('./checkType');

describe('helpers/checkType', () => {

  it('checks for boolean values', () => {
    const validValues = [
      true,
      false
    ];
    const invaildValues = [
      1,
      0,
      -1,
      'true',
      'false'
    ];

    validValues.forEach(value => {
      expect(checkType(value, 'boolean')).to.be.true;
    });

    invaildValues.forEach(value => {
      expect(checkType(value, 'boolean')).to.be.false;
    });
  });

  it('checks for function values', () => {
    const myArrowFunction = () => null;

    function myFunction () {
      return null;
    }

    const validValues = [
      myArrowFunction,
      myFunction,
      Math.round,
      new Function()
    ];
    const invaildValues = [
      new Object(),
      {},
      'function'
    ];

    validValues.forEach(value => {
      expect(checkType(value, 'function')).to.be.true;
    });

    invaildValues.forEach(value => {
      expect(checkType(value, 'function')).to.be.false;
    });
  });

  it('checks for number values', () => {
    const validValues = [
      1,
      12.34,
      Math.PI,
      Number.NaN,
      -3
    ];
    const invaildValues = [
      '3',
      'five',
      {},
      Math.ceil
    ];

    validValues.forEach(value => {
      expect(checkType(value, 'number')).to.be.true;
    });

    invaildValues.forEach(value => {
      expect(checkType(value, 'number')).to.be.false;
    });
  });

  it('checks for object values', () => {
    const validValues = [
      [],
      {},
      new Array()
    ];
    const invaildValues = [
      'string',
      5,
      true
    ];

    validValues.forEach(value => {
      expect(checkType(value, 'object')).to.be.true;
    });

    invaildValues.forEach(value => {
      expect(checkType(value, 'object')).to.be.false;
    });
  });

  it('checks for string values', () => {
    const validValues = [
      'qwerty'
    ];
    const invaildValues = [
      4,
      []
    ];

    validValues.forEach(value => {
      expect(checkType(value, 'string')).to.be.true;
    });

    invaildValues.forEach(value => {
      expect(checkType(value, 'string')).to.be.false;
    });
  });

  it('allows different casing for the type argument', () => {
    const pairs = [
      [ true, 'boolEAN' ],
      [ 'abs', 'STRING' ],
      [ {}, 'obJect']
    ];

    pairs.forEach(pair => {
      expect(checkType(pair[0], pair[1])).to.be.true;
    });
  });

  it('returns false if type argument is not of type string', () => {
    const pairs = [
      [ true, Boolean ],
      [ 'a', [] ],
      [ 6, 6 ]
    ];

    pairs.forEach(pair => {
      expect(checkType(pair[0], pair[1])).to.be.false;
    });
  });

});
