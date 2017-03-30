const { expect } = require('chai');
const string = require('./index');

describe('string', () => {

  const methods = [
    'ascii',
    'base64',
    'between',
    'contains',
    'empty',
    'endsWith',
    'enum',
    'equals',
    'extendedAscii',
    'hexColor',
    'isJson',
    'isString',
    'length',
    'lowercase',
    'match',
    'max',
    'min',
    'notEmpty',
    'startsWith',
    'uppercase'
  ];

  methods.forEach(method => {
    it(`string exports ${method}`, () => {
      expect(string[method]).to.be.a('function');
    });
  });

});
