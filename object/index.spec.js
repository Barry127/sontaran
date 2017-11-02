const object = require('./index');

const methods = [
  'contains',
  'equals',
  'hasKey',
  'hasKeys',
  'hasOwnProperties',
  'hasOwnProperty',
  'isObject',
  'isSubset',
  'isSuperset',
  'length',
  'max',
  'min'
];

methods.forEach(method => {
  test(`object exports ${method}`, () => {
    expect(object[method]).toBe(require(`./${method}`));
  });
});
