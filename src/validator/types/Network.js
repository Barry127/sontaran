const StringValidator = require('./String');
const NumberValidator = require('./Number');

function ipv4 (value) {
  const parts = value.split('.');

  if (parts.length !== 4) {
    return false;
  }

  for (let i = 0; i < parts.length; i++) {
    const partStringValue = parts[i];
    const partStringValidator = new StringValidator(partStringValue);

    if (partStringValue.length > 1 && partStringValidator.startsWith('0').valid()) {
      return false;
    }

    const partNumberValue = parseInt(partStringValue, 10);
    const partNumberValidator = new NumberValidator(partNumberValue);

    if (partNumberValidator.notNaN().min(0).max(255).invalid()) {
      return false;
    }
  }

  return true;
}

function ipv6 (value) {
  const IPv6Regex = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;

  if (!IPv6Regex.test(value)) {
    return false;
  }

  return true;
}

class NetworkValidator extends StringValidator {

  /**
   * Check if value is a valid ip address
   * @return {Object} NetworkValidator
   */
  ip () {
    if (ipv4(this.value) || ipv6(this.value)) {
      return this;
    }

    return this._addError({
      type: 'ip',
      expected: 'IPv4/IPv6',
      actual: this.value,
      message: `Expected ${this.value} to be a valid ip address`
    });
  }

  /**
   * Check if value is a valid decimal notation of an IPv4 address
   * @return {Object} NetworkValidator
   */
  IPv4 () {
    if (!ipv4(this.value)) {
      return this._addError({
        type: 'IPv4',
        expected: 'xxx.xxx.xxx.xxx',
        actual: this.value,
        message: `Expected ${this.value} to be a valid IPv4 address`
      });
    }

    return this;
  }

  ipV4 () {
    return this.IPv4(); // eslint-disable-line
  }

  ipv4 () {
    return this.IPv4(); // eslint-disable-line
  }

  /**
   * Check if value is a valid IPv6 address
   * @return {Object} NetworkValidator
   */
  IPv6 () {
    if (!ipv6(this.value)) {
      return this._addError({
        type: 'IPv6',
        expected: 'xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx',
        actual: this.value,
        message: `Expected ${this.value} to be a valid IPv6 address`
      });
    }

    return this;
  }

  ipV6 () {
    return this.IPv6(); // eslint-disable-line
  }

  ipv6 () {
    return this.IPv6(); // eslint-disable-line
  }

  MAC () {
    const MACRegex = /^([0-9a-f]{2}:){5}[0-9a-f]{2}$/i;

    return this.match(MACRegex, {
      type: 'MAC',
      message: `Expected ${this.value} to be a MAC address`
    });
  }

  mac () {
    return this.MAC() // eslint-disable-line
  }

}

module.exports = NetworkValidator;
