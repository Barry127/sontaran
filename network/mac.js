const MACRegex = /^([0-9a-f]{2}:){5}[0-9a-f]{2}$/i;

/**
 * Check if value is a MAC address
 * @param  {String} value Value to check
 * @return {Boolean}      Result
 */
function mac (value) {
  return MACRegex.test(value);
}

module.exports = mac;
