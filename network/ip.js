const ipv4 = require('./ipv4')();
const ipv6 = require('./ipv6')();

function ip () {
  return value => ipv6(value) || ipv4(value);
}

module.exports = ip;
