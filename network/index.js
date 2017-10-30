const network = {};
const methods = [
  'ip',
  'ipV4',
  'ipv4',
  'ipV6',
  'ipv6',
  'mac'
];

methods.forEach(method => {
  network[method] = require(`./${method}`);
});

module.exports = network;
