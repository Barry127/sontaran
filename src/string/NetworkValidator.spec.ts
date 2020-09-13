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
      it(`${value} is a valid IP address`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not a valid IP address`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('sets correct error type and message', () => {
      const result = validator.label('myLabel').validate('255.168.300.1');
      const error = result.errors?.[0]!;
      expect(error.type).toBe('network.ip');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('IP');
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
      it(`${value} is a valid IPv4 address`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not a valid IPv4 address`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('sets correct error type and message', () => {
      const result = validator.label('myLabel').validate('255.168.300.1');
      const error = result.errors?.[0]!;
      expect(error.type).toBe('network.ipv4');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('IPv4');
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
      it(`${value} is a valid IPv6 address`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not a valid IPv6 address`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('sets correct error type and message', () => {
      const result = validator
        .label('myLabel')
        .validate('2001:0db8::02de::1428:57ab');
      const error = result.errors?.[0]!;
      expect(error.type).toBe('network.ipv6');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('IPv6');
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
      it(`${value} is a valid MAC address`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not a valid MAC address`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('sets correct error type and message', () => {
      const result = validator.label('myLabel').validate('123');
      const error = result.errors?.[0]!;
      expect(error.type).toBe('network.mac');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('MAC');
    });
  });

  describe('tld', () => {
    const validPairs = [
      ['https://www.google.com', '.com'],
      ['http://www.google.com', 'com'],
      ['http://google.com/search?q=tld', ['com', 'nl']],
      ['ftp://www.somedomain.com:8080', 'CoM'],
      ['http://domain.oRg?q=a', 'org'],
      ['http://sub.domain.co.uk#bookmark', 'co.uk'],
      ['www.mypage.co.uk/', '.co.uk']
    ];
    const invalidPairs = [
      ['https://www.google.com', '.org'],
      ['http://www.google.com', 'org'],
      ['http://google.com/search?q=tld', ['co.uk', 'nl']],
      ['ftp://www.somedomain.com:8080', ':8080'],
      ['http://domain.oRg?q=a', 'tk'],
      ['http://sub.domain.co.uk#bookmark', 'gov.uk'],
      ['www.mypage.co.uk/', '.gov.uk']
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} has tld ${argument}`, () => {
        const result = network()
          .tld(argument as string | string[])
          .validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} does not have tld ${argument}`, () => {
        const result = network()
          .tld(argument as string | string[])
          .validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('throws a type error when tlds is not a string or array of string', () => {
      const validator = network();
      expect(validator.tld.bind(validator, {} as any)).toThrow(TypeError);
    });

    it('sets correct error type and message', () => {
      const result = network()
        .label('myLabel')
        .tld(['nl', 'org'])
        .validate('http://google.com');
      const error = result.errors?.[0]!;
      expect(error.type).toBe('network.tld');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('[nl,org]');
    });
  });

  describe('tldblacklist', () => {
    const validPairs = [
      ['https://www.google.com', '.org'],
      ['http://www.google.com', 'org'],
      ['http://google.com/search?q=tld', ['co.uk', 'nl']],
      ['ftp://www.somedomain.com:8080', ':8080'],
      ['http://domain.oRg?q=a', 'tk'],
      ['http://sub.domain.co.uk#bookmark', 'gov.uk'],
      ['www.mypage.co.uk/', '.gov.uk']
    ];
    const invalidPairs = [
      ['https://www.google.com', '.com'],
      ['http://www.google.com', 'com'],
      ['http://google.com/search?q=tld', ['com', 'nl']],
      ['ftp://www.somedomain.com:8080', 'CoM'],
      ['http://domain.oRg?q=a', 'org'],
      ['http://sub.domain.co.uk#bookmark', 'co.uk'],
      ['www.mypage.co.uk/', '.co.uk']
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} does not have tld ${argument}`, () => {
        const result = network()
          .tldBlacklist(argument as string | string[])
          .validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} does have tld ${argument}`, () => {
        const result = network()
          .tldBlacklist(argument as string | string[])
          .validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('throws a type error when tlds is not a string or array of string', () => {
      const validator = network();
      expect(validator.tldBlacklist.bind(validator, {} as any)).toThrow(
        TypeError
      );
    });

    it('sets correct error type and message', () => {
      const result = network()
        .label('myLabel')
        .tldBlacklist(['nl', 'org'])
        .validate('http://google.org');
      const error = result.errors?.[0]!;
      expect(error.type).toBe('network.tldblacklist');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('org');
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
      it(`${value} is a valid URL`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not a valid URL`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('sets correct error type and message', () => {
      const result = validator.label('myLabel').validate('google.com');
      const error = result.errors?.[0]!;
      expect(error.type).toBe('network.url');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('URL');
    });
  });
});
