const string = require('./index');

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
  'isJSON',
  'isJson',
  'isString',
  'length',
  'lowerCase',
  'lowercase',
  'match',
  'max',
  'min',
  'notEmpty',
  'oneOf',
  'startsWith',
  'upperCase',
  'uppercase'
];

methods.forEach(method => {
  test(`string exports ${method}`, () => {
    expect(string[method]).toBe(require(`./${method}`));
  });
});