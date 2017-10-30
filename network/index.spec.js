const network = require('./index');

const methods = [
  'ip',
  'ipV4',
  'ipv4',
  'ipV6',
  'ipv6',
  'mac'
];

methods.forEach(method => {
  test(`network exports ${method}`, () => {
    expect(network[method]).toBe(require(`./${method}`));
  });
});
