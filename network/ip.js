const ipv4 = require('./ipv4');
const ipv6 = require('./ipv6');

/**
 * Check if value is valid ip address
 * @param  {String} value Value to check
 * @return {Boolean}      Result
 */
function ip (value) {
  return (ipv4(value) || ipv6(value));
}

module.exports = ip;
