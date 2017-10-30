const array = require('./index');

const methods = [
  'between',
  'contains',
  'each',
  'equals',
  'isArray',
  'isSubset',
  'isSuperset',
  'length',
  'max',
  'min',
  'of'
];

methods.forEach(method => {
  test(`array exports ${method}`, () => {
    expect(array[method]).toBe(require(`./${method}`));
  });
});
