const { expect }        = require('chai');
const { spy }           = require('sinon');
const NetworkValidator  = require('./Network');

describe.only('Validator / types / Network', () => {

  it('Is valid if given value is of type string', () => {
    const value = 'Hello World';
    const validator = new NetworkValidator(value);

    expect(validator.valid()).to.be.true;
  });

  it('Is invalid if given value is undefined', () => {
    const validator = new NetworkValidator();

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('string');
    expect(validator.errors()[0].actual).to.equal('undefined');
  });

  it('Is invalid if given value is null', () => {
    const value = null;
    const validator = new NetworkValidator(value);

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('string');
    expect(validator.errors()[0].actual).to.equal('object');
  });

  it('Is invalid if given type is boolean', () => {
    const value = true;
    const validator = new NetworkValidator(value);

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('string');
    expect(validator.errors()[0].actual).to.equal('boolean');
  });

  it('Is invalid if given type is number', () => {
    const value = 42;
    const validator = new NetworkValidator(value);

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('string');
    expect(validator.errors()[0].actual).to.equal('number');
  });

  it('Is invalid if given type is object', () => {
    const value = {};
    const validator = new NetworkValidator(value);

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('string');
    expect(validator.errors()[0].actual).to.equal('object');
  });

  describe('ip', () => {

    it('Returns itself', () => {
      const validator = new NetworkValidator('172.16.0.0');
      const validator2 = new NetworkValidator('http://www.google.com');

      expect(validator.ip()).to.be.an.instanceof(NetworkValidator);
      expect(validator2.ip()).to.be.an.instanceof(NetworkValidator);
    });

    it('Is valid if the value is a valid IPv4 address', () => {
      const validator = new NetworkValidator('10.0.0.1');

      expect(validator.ip().valid()).to.be.true;
    });

    it('Is valid if the value is a valid IPv6 address', () => {
      const ips = [
       '2001:0db8:85a3:0000:1319:8a2e:0370:7344',
       '2001:0db8:85a3:0:1319:8a2e:0370:7344',
       '2001:0db8:85a3::1319:8a2e:0370:7344',
       '2001:0db8:0000:0000:0000:0000:1428:57ab',
       '2001:0db8:0000:0000:0000::1428:57ab',
       '2001:0db8:0:0:0:0:1428:57ab',
       '2001:0db8:0::0:1428:57ab',
       '2001:0db8::1428:57ab',
       '2001:0db8:02de::0e13',
       '2001:db8:2de::e13',
       '::ffff:192.168.89.9'
      ];

      ips.forEach((ip) => {
        const validator = new NetworkValidator(ip);
        expect(validator.ip().valid()).to.be.true;
      });
    });

    it('Is invalid if the value is not a valid IPv4 address', () => {
      const ips = [
        '255.168.1.300',
        '192.256.1.666',
        '192.168.1.09'
      ];

      ips.forEach((ip) => {
        const validator = new NetworkValidator(ip);
        expect(validator.ip().valid()).to.be.false;
      });
    });

    it('Is invalid if the value is not a valid IPv6 address', () => {
      const ips = [
        '2001::0db8::cade',

      ];

      ips.forEach((ip) => {
        const validator = new NetworkValidator(ip);
        expect(validator.ip().valid()).to.be.false;
      });
    });

    it('Is invalid if the value is not an ip address', () => {
      const validator = new NetworkValidator('http://www.google.com');

      expect(validator.ip().valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual for the error', () => {
      const validator = new NetworkValidator('http://www.google.com').ip();

      expect(validator.errors()[0].type).to.equal('ip');
      expect(validator.errors()[0].expected).to.equal('IPv4/IPv6');
      expect(validator.errors()[0].actual).to.equal('http://www.google.com');
    });

  });

  describe('IPv4', () => {

    it('Returns itself', () => {
      const validator = new NetworkValidator('192.168.1.1');
      const validator2 = new NetworkValidator('192.256.1.1');

      expect(validator.IPv4()).to.be.an.instanceof(NetworkValidator);
      expect(validator2.IPv4()).to.be.an.instanceof(NetworkValidator);
    });

    it('Is valid if the value is a valid IPv4 address', () => {
      const value = '192.168.1.1';
      const validator = new NetworkValidator(value);

      expect(validator.IPv4().valid()).to.be.true;
    });

    it('Is invalid if one or more blocks have a higher value than 255', () => {
      const validator = new NetworkValidator('255.168.1.300');
      const validator2 = new NetworkValidator('192.256.1.666');

      expect(validator.IPv4().valid()).to.be.false;
      expect(validator2.IPv4().valid()).to.be.false;
    });

    it('Is invalid if the value is not a valid IPv4 address', () => {
      const validator = new NetworkValidator('192.168.1.09');

      expect(validator.IPv4().valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error', () => {
      const validator = new NetworkValidator('http://www.google.com').IPv4();

      expect(validator.errors()[0].type).to.equal('IPv4');
      expect(validator.errors()[0].expected).to.equal('xxx.xxx.xxx.xxx');
      expect(validator.errors()[0].actual).to.equal('http://www.google.com');
    });

  });

  describe('ipV4', () => {

    it('Calls IPv4', () => {
      const validator = new NetworkValidator('127.0.0.1');
      validator.IPv4 = spy();
      validator.ipV4();

      expect(validator.IPv4.calledOnce).to.be.true;
    });

  });

  describe('ipv4', () => {

    it('Calls IPv4', () => {
      const validator = new NetworkValidator('127.0.0.1');
      validator.IPv4 = spy();
      validator.ipv4();

      expect(validator.IPv4.calledOnce).to.be.true;
    });

  });

  describe('IPv6', () => {

    it ('Returns itself', () => {
      const validator = new NetworkValidator('2001:0db8:85a3:08d3:1319:8a2e:0370:7344');
      const validator2 = new NetworkValidator('No Ipv6');

      expect(validator.IPv6()).to.be.an.instanceof(NetworkValidator);
      expect(validator2.IPv6()).to.be.an.instanceof(NetworkValidator);
    });

    it('Is valid if the value is a valid IPv6 address', () => {
      const ips = [
       '2001:0db8:85a3:0000:1319:8a2e:0370:7344',
       '2001:0db8:85a3:0:1319:8a2e:0370:7344',
       '2001:0db8:85a3::1319:8a2e:0370:7344',
       '2001:0db8:0000:0000:0000:0000:1428:57ab',
       '2001:0db8:0000:0000:0000::1428:57ab',
       '2001:0db8:0:0:0:0:1428:57ab',
       '2001:0db8:0::0:1428:57ab',
       '2001:0db8::1428:57ab',
       '2001:0db8:02de::0e13',
       '2001:db8:2de::e13',
       '::ffff:192.168.89.9'
      ];

      ips.forEach((ip) => {
        const validator = new NetworkValidator(ip);
        expect(validator.IPv6().valid()).to.be.true;
      });
    });

    it('Is invalid if the value is not a valid IPv6 address', () => {
      const ips = [
        '2001::0db8::cade',

      ];

      ips.forEach((ip) => {
        const validator = new NetworkValidator(ip);
        expect(validator.IPv6().valid()).to.be.false;
      });
    });

    it('Sets the correct type, expected and actual to the error', () => {
      const validator = new NetworkValidator('No IPv6').IPv6();

      expect(validator.errors()[0].type).to.equal('IPv6');
      expect(validator.errors()[0].expected).to.equal('xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx');
      expect(validator.errors()[0].actual).to.equal('No IPv6');
    });

  });

  describe('ipV6', () => {

    it('Calls IPv6', () => {
      const validator = new NetworkValidator('2001:0db8:85a3:08d3:1319:8a2e:0370:7344');
      validator.IPv6 = spy();
      validator.ipV6();

      expect(validator.IPv6.calledOnce).to.be.true;
    });

  });

  describe('ipv6', () => {

    it('Calls IPv6', () => {
      const validator = new NetworkValidator('2001:0db8:85a3:08d3:1319:8a2e:0370:7344');
      validator.IPv6 = spy();
      validator.ipv6();

      expect(validator.IPv6.calledOnce).to.be.true;
    });

  });

  describe('MAC', () => {

    it('Returns itself', () => {
      const validator = new NetworkValidator('00:0c:6e:d2:11:e6');
      const validator2 = new NetworkValidator('192.168.1.1');

      expect(validator.MAC()).to.be.an.instanceof(NetworkValidator);
      expect(validator2.MAC()).to.be.an.instanceof(NetworkValidator);
    });

    it('Is valid if the value is a MAC address', () => {
      const validMACs = [
        '00:0c:6e:d2:11:e6',
        'FF:FF:FF:FF:FF:FF',
        'b4:77:EE:00:00:43'
      ];

      validMACs.forEach((mac) => {
        const validator = new NetworkValidator(mac);

        expect(validator.MAC().valid()).to.be.true;
      });
    });

    it('Is invalid if the value is not a MAC address', () => {
      const invalidMACs = [
        '00:0h:6e:d2:11:e6',
        '127.0.0.1',
        '2001:0db8:85a3:0000:1319:8a2e:0370:7344'
      ];

      invalidMACs.forEach((mac) => {
        const validator = new NetworkValidator(mac);

        expect(validator.MAC().valid()).to.be.false;
      });
    });

    it('Sets the correct type, actual and expected to the error', () => {
      const validator = new NetworkValidator('00:0h:6e:d2:11:e6').MAC();

      expect(validator.errors()[0].type).to.equal('MAC');
      expect(validator.errors()[0].expected).to.equal('/^([0-9a-f]{2}:){5}[0-9a-f]{2}$/i');
      expect(validator.errors()[0].actual).to.equal('00:0h:6e:d2:11:e6');
    });

  });

  describe('mac', () => {

    it('Calls MAC', () => {
      const validator = new NetworkValidator('00:0c:6e:d2:11:e6');
      validator.MAC = spy();
      validator.mac();

      expect(validator.MAC.calledOnce).to.be.true;
    });
  })

});
