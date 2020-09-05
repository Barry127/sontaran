import { NetworkValidator, network } from './NetworkValidator';

describe('StringValidator', () => {
  it('exports factory method', () => {
    expect(network()).toBeInstanceOf(NetworkValidator);
  });

  describe('ip', () => {
    const validValues = [
      '192.168.1.1',
      '255.255.255.255',
      '91.198.174.232',
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
    const invalidValues = [
      '343',
      '192.168.1.666',
      '192.168.01.3',
      '255.168.300.1',
      '2001::0db8::cade',
      '2001:0db8::02de::1428:57ab'
    ];
    const validator = network().ip();

    validValues.forEach((value) => {
      it(`${value} is a valid IP address`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not a valid IP address`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });
  });

  describe('ipv4', () => {
    const validValues = [
      '192.168.1.1',
      '255.255.255.255',
      '91.198.174.232',
      '127.0.0.1'
    ];
    const invalidValues = [
      '343',
      '192.168.1.666',
      '192.168.01.3',
      '255.168.300.1'
    ];
    const validator = network().ipv4();

    validValues.forEach((value) => {
      it(`${value} is a valid IPv4 address`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not a valid IPv4 address`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });
  });

  describe('ipv6', () => {
    const validValues = [
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
    const invalidValues = [
      '343',
      '192.168.1.666',
      '192.168.1.3',
      '255.168.3.1',
      '2001::0db8::cade',
      '2001:0db8::02de::1428:57ab'
    ];
    const validator = network().ipv6();

    validValues.forEach((value) => {
      it(`${value} is a valid IPv6 address`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not a valid IPv6 address`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });
  });

  describe('mac', () => {
    const validValues = [
      '00:0c:6e:d2:11:e6',
      'FF:FF:FF:FF:FF:FF',
      'b4:77:EE:00:00:43'
    ];
    const invalidValues = [
      '123',
      '00:0h:6e:d2:11:e6',
      '127.0.0.1',
      '2001:0db8:85a3:0000:1319:8a2e:0370:7344'
    ];
    const validator = network().mac();

    validValues.forEach((value) => {
      it(`${value} is a valid MAC address`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not a valid MAC address`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });
  });

  describe('url', () => {
    const validValues = [
      'https://www.google.com',
      'http://www.google.com',
      'http://localhost',
      'ftp://www.somedomain.com:8080',
      'http://domain.extension:3000/page.php?q=a',
      'http://sub.domain.extension:3000/page.php?q=a#b',
      'www.mypage.co.uk'
    ];
    const invalidValues = ['google.com', 'sub.domain.com', 'http://#a.com'];
    const validator = network().url();

    validValues.forEach((value) => {
      it(`${value} is a valid URL`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not a valid URL`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });
  });
});
