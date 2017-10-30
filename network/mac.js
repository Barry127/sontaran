const match = require('../string/match');
const macMAtcher = match(/^([0-9a-f]{2}:){5}[0-9a-f]{2}$/i);

function mac () {
  return value => macMAtcher(value);
}

module.exports = mac;
