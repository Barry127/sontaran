const email = require('./index');

const methods = [
  'domain',
  'isEmail',
  'localPart',
  'name',
  'noThrowAway'
];

methods.forEach(method => {
  test(`email exports ${method}`, () => {
    expect(email[method]).toBe(require(`./${method}`));
  });
});
