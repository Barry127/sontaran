import { EmailValidator, email } from './EmailValidator';
import { badEmailDomains as blacklist } from '../_data/badEmailDomains';

describe('StringValidator', () => {
  it('exports factory method', () => {
    expect(email()).toBeInstanceOf(EmailValidator);
  });

  describe('email validation', () => {
    const validValues = [
      'prettyandsimple@example.com',
      'very.common@example.com',
      'disposable.style.email.with+symbol@example.com',
      'other.email-with-dash@example.com',
      'x@example.com', // one-letter local-part
      '"much.more unusual"@example.com',
      '"very.unusual.@.unusual.com"@example.com',
      'example-indeed@strange-example.com',
      `#!$%&'*+-/=?^_\`{}|~@example.org`,
      `"()<>[]:,;@\\\"!#$%&'-/=?^_\`{}| ~.a"@example.org`,
      '" "@example.org', // space between the quotes
      'example@s.solutions', // new TLD
      'user@[IPv6:2001:DB8::1]', // IPv6 address
      'user@172.217.17.101' // IPv4 address
    ];
    const invalidValues = [
      'Abc.example.com', // no @ character
      'A@b@c@example.com', // only one @ character is allowed outside quotation marks
      'user@localserver', // https://www.icann.org/news/announcement-2013-08-30-en
      'user@tt', // https://www.icann.org/news/announcement-2013-08-30-en
      'a"b(c)d,e:f;g<h>i[jk]l@example.com', // none of the special characters in this local-part are allowed outside quotation marks
      'just"not"right@example.com', // quoted strings must be dot separated or the only element making up the local-part
      'this is"notallowed@example.com', // spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash
      'this still"not\\allowed@example.com', // even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes
      'john..doe@example.com', // double dot before @
      'john.doe@example..com', // double dot after @
      ' john@doe.com', // a valid email address with a leading space
      'john@doe.com ' // a valid email address with a trailing space
    ];
    const validator = email();

    validValues.forEach((value) => {
      it(`${value} is a valid email`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not a valid email`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('sets correct error type and message', () => {
      const result = validator.label('myLabel').validate('email');
      const error = result.errors?.[0]!;
      expect(error.type).toBe('email.email');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('email');
    });
  });

  describe('domain', () => {
    const validPairs = [
      ['john@doe.com', 'doe.com'],
      ['john@doe.com', 'DoE.Com'],
      ['janedoe@google.com', /google/],
      ['my@you.co.uk', /co.uk$/],
      ['bill@hotmail.com', /HotMail/i]
    ];
    const invalidPairs = [
      ['larry@gmail.com', 'hotmail.com'],
      ['bill@hotmail.com', /gmail/],
      ['some@mail.ru', 'mail.com']
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} has domain ${argument}`, () => {
        const result = email()
          .domain(argument as string | RegExp)
          .validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} does not have domain ${argument}`, () => {
        const result = email()
          .domain(argument as string | RegExp)
          .validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('throws a type error when expectedDomain is not a string or RegExp', () => {
      const validator = email();
      expect(validator.domain.bind(validator, {} as any)).toThrow(TypeError);
    });

    it('sets correct error type and message', () => {
      const result = email()
        .label('myLabel')
        .domain('hotmail.com')
        .validate('email@gmail.com');
      const error = result.errors?.[0]!;
      expect(error.type).toBe('email.domain');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('hotmail.com');
    });
  });

  describe('domainBlacklist', () => {
    const validValues = [
      'john@doe.com',
      'johndoe@hotmail.com',
      'janedoe@notatyopmail.com'
    ];
    const invalidValues = [
      'johndoe@yopmail.com',
      'johndoe@YopMail.com',
      'john.doe@toiea.com',
      'jane.doe@sub.fastmazda.com',
      'me@some.crazy.long.prefix.zehnminutenmail.de'
    ];
    const validator = email().domainBlacklist(blacklist);

    validValues.forEach((value) => {
      it(`${value} is a valid email`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is on blacklist`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('throws a type error when blacklist is not an array', () => {
      const validator = email();
      expect(
        validator.domainBlacklist.bind(validator, 'yopmail.com' as any)
      ).toThrow(TypeError);
    });

    it('sets correct error type and message', () => {
      const result = validator.label('myLabel').validate('email@yopmail.com');
      const error = result.errors?.[0]!;
      expect(error.type).toBe('email.domainblacklist');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('yopmail.com');
    });
  });

  describe('localPart', () => {
    it('calls name with expectedName', () => {
      const expectedName = 'a';
      const validator = email();
      validator.name = jest.fn();

      expect(validator.name).not.toBeCalled();

      validator.localPart(expectedName);

      expect(validator.name).toBeCalledWith(expectedName);
    });
  });

  describe('name', () => {
    const validPairs = [
      ['john@doe.com', 'john'],
      ['janedoe@google.com', /jane/],
      ['my-check@you.co.uk', /check$/],
      ['bill@hotmail.com', /Bill/i]
    ];
    const invalidPairs = [
      ['john@doe.com', 'JoHn'],
      ['larry@gmail.com', 'sergei'],
      ['bill@hotmail.com', /steve/],
      ['some@mail.ru', 'any']
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} has local part ${argument}`, () => {
        const result = email()
          .name(argument as string | RegExp)
          .validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} does not have local part ${argument}`, () => {
        const result = email()
          .name(argument as string | RegExp)
          .validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('throws a type error when expectedName is not a string or RegExp', () => {
      const validator = email();
      expect(validator.name.bind(validator, {} as any)).toThrow(TypeError);
    });

    it('sets correct error type and message', () => {
      const result = email()
        .label('myLabel')
        .name('johndoe')
        .validate('janedoe@google.com');
      const error = result.errors?.[0]!;
      expect(error.type).toBe('email.name');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('johndoe');
    });
  });

  describe('tld', () => {
    const validPairs = [
      ['john@doe.com', '.com'],
      ['john@doe.com', 'com'],
      ['john@doe.cOm', 'com'],
      ['john@doe.com', 'CoM'],
      ['janedoe@google.com', ['com', 'co.uk', 'nl']],
      ['my-check@you.co.uk', 'co.uk'],
      ['bill@hotmail.co.uk', '.uk']
    ];
    const invalidPairs = [
      ['john@doe.com', '.org'],
      ['john@gmail.com', ['org', 'nl', 'co.uk']],
      ['some@mail.ru', ['com']]
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} has tld ${argument}`, () => {
        const result = email()
          .tld(argument as string | string[])
          .validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} does not have tld ${argument}`, () => {
        const result = email()
          .tld(argument as string | string[])
          .validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('throws a type error when tlds is not a string or array of string', () => {
      const validator = email();
      expect(validator.tld.bind(validator, {} as any)).toThrow(TypeError);
    });

    it('sets correct error type and message', () => {
      const result = email()
        .label('myLabel')
        .tld(['nl', 'org'])
        .validate('janedoe@google.com');
      const error = result.errors?.[0]!;
      expect(error.type).toBe('email.tld');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('[nl,org]');
    });
  });

  describe('tldBlacklist', () => {
    const validPairs = [
      ['john@doe.com', '.org'],
      ['john@gmail.com', ['org', 'nl', 'co.uk']],
      ['some@mail.ru', ['com']]
    ];
    const invalidPairs = [
      ['john@doe.com', '.com'],
      ['john@doe.com', 'com'],
      ['john@doe.cOm', 'com'],
      ['john@doe.com', 'CoM'],
      ['janedoe@google.com', ['com', 'co.uk', 'nl']],
      ['my-check@you.co.uk', 'co.uk'],
      ['bill@hotmail.co.uk', '.uk']
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} does not have tld ${argument}`, () => {
        const result = email()
          .tldBlacklist(argument as string | string[])
          .validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} does have tld ${argument}`, () => {
        const result = email()
          .tldBlacklist(argument as string | string[])
          .validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('throws a type error when tlds is not a string or array of string', () => {
      const validator = email();
      expect(validator.tldBlacklist.bind(validator, {} as any)).toThrow(
        TypeError
      );
    });

    it('sets correct error type and message', () => {
      const result = email()
        .label('myLabel')
        .tldBlacklist(['nl', 'org'])
        .validate('janedoe@domain.org');
      const error = result.errors?.[0]!;
      expect(error.type).toBe('email.tldblacklist');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('org');
    });
  });
});
