const boolean = require('./index');

const methods = [
  'equals',
  'isBool',
  'isBoolean',
  'isFalse',
  'isTrue'
];

methods.forEach(method => {
  test(`boolean exports ${method}`, () => {
    expect(boolean[method]).toBe(require(`./${method}`));
  });
});
