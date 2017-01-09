const { expect }      = require('chai');
const { spy, stub }   = require('sinon');
const EmailValidator  = require('./Email');

const validEmails = [
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

const invalidEmails = [
  'Abc.example.com', // no @ character
  'A@b@c@example.com', // only one @ character is allowed outside quotation marks
  'user@localserver', // https://www.icann.org/news/announcement-2013-08-30-en
  'user@tt', // https://www.icann.org/news/announcement-2013-08-30-en
  'a"b(c)d,e:f;g<h>i[j\k]l@example.com', // none of the special characters in this local-part are allowed outside quotation marks
  'just"not"right@example.com', // quoted strings must be dot separated or the only element making up the local-part
  'this is"not\allowed@example.com', // spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash
  'this\ still\"not\\allowed@example.com', // even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes
  'john..doe@example.com', // double dot before @
  'john.doe@example..com', // double dot after @
  ' john@doe.com', // a valid email address with a leading space
  'john@doe.com ', // a valid email address with a trailing space
];

describe('Validator / types / Email', () => {

  it('is valid if given value is a valid email address', () => {
    validEmails.forEach((email) => {
      const validator = new EmailValidator(email);

      expect(validator.valid()).to.be.true;
    });
  });

  it('is invalid if given value is an invalid email adress', () => {
    invalidEmails.forEach((email) => {
      const validator = new EmailValidator(email);

      expect(validator.valid()).to.be.false;
      expect(validator.errors()[0].type).to.equal('email');
      expect(validator.errors()[0].expected).to.equal('email');
      expect(validator.errors()[0].actual).to.equal(email);
    });
  });

  it('Is invalid if given value is undefined', () => {
    const validator = new EmailValidator();

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('string');
    expect(validator.errors()[0].actual).to.equal('undefined');
  });

  it('Is invalid if given value is null', () => {
    const value = null;
    const validator = new EmailValidator(value);

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('string');
    expect(validator.errors()[0].actual).to.equal('object');
  });

  it('Is invalid if given type is boolean', () => {
    const value = true;
    const validator = new EmailValidator(value);

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('string');
    expect(validator.errors()[0].actual).to.equal('boolean');
  });

  it('Is invalid if given type is number', () => {
    const value = 42;
    const validator = new EmailValidator(value);

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('string');
    expect(validator.errors()[0].actual).to.equal('number');
  });

  it('Is invalid if given type is object', () => {
    const value = {};
    const validator = new EmailValidator(value);

    expect(validator.valid()).to.be.false;
    expect(validator.errors()[0].type).to.equal('type');
    expect(validator.errors()[0].expected).to.equal('string');
    expect(validator.errors()[0].actual).to.equal('object');
  });

  describe('domain', () => {

    let validator;

    beforeEach(() => {
      validator = new EmailValidator('john@doe.com');
    });

    it('Throws an Error if domainName is not of type string', () => {
      expect(validator.domain.bind(validator, {})).to.throw(Error, 'EmailValidator.domain: domainName is not of type string');
    });

    it('Returns itself', () => {
      expect(validator.domain('doe.com')).to.be.an.instanceof(EmailValidator);
      expect(validator.domain('not-doe.com')).to.be.an.instanceof(EmailValidator);
    });

    it('Is valid if the domain of the value email equals domainName', () => {
      expect(validator.domain('doe.com').valid()).to.be.true;
    });

    it('Is valid if the domain of the value email equals domainName with different casing', () => {
      expect(validator.domain('DoE.cOm').valid()).to.be.true;
    });

    it('Is invalid if the domain of the value email does not equal domainName', () => {
      expect(validator.domain('not-doe.com').valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error', () => {
      validator.domain('not-doe.com');

      expect(validator.errors()[0].type).to.equal('domain');
      expect(validator.errors()[0].expected).to.equal('not-doe.com');
      expect(validator.errors()[0].actual).to.equal('doe.com');
    });

  });

  describe('domainMatch', () => {

    let validator;

    beforeEach(() => {
      validator = new EmailValidator('john@doe.com');
      validator.matchDomain = spy();
    });

    it('Calls matchDomain', () => {
      validator.domainMatch(/gmail/);

      expect(validator.matchDomain.calledOnce).to.be.true;
    });

    it('Passes pattern to matchDomain', () => {
      const regex = /gmail/;
      validator.domainMatch(regex);

      expect(validator.matchDomain.calledWithExactly(regex)).to.be.true;
    });

  });

  describe('matchDomain', () => {

    let validator;

    beforeEach(() => {
      validator = new EmailValidator('john.doe@gmail.com');
    });

    it('Throws an Error if pattern is not of type RegExp', () => {
      expect(validator.matchDomain.bind(validator, {})).to.throw(Error, 'EmailValidator.matchDomain: pattern is not an instance of RegExp')
    });

    it('Returns itself', () => {
      expect(validator.matchDomain(/gmail/)).is.an.instanceof(EmailValidator);
      expect(validator.matchDomain(/hotmail/)).is.an.instanceof(EmailValidator);
    });

    it('Is valid if the domain of the value matches pattern', () => {
      expect(validator.matchDomain(/gmail/).valid()).to.be.true;
    });

    it('Is invalid if the domain of the value does not match pattern', () => {
      expect(validator.matchDomain(/hotmail/).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error', () => {
      validator.matchDomain(/hotmail/);

      expect(validator.errors()[0].type).to.equal('matchDomain');
      expect(validator.errors()[0].expected).to.equal('/hotmail/');
      expect(validator.errors()[0].actual).to.equal('gmail.com');
    });

  });

  describe('matchName', () => {

    let validator;

    beforeEach(() => {
      validator = new EmailValidator('john.doe@gmail.com');
    });

    it('Throws an Error if pattern is not of type RegExp', () => {
      expect(validator.matchName.bind(validator, 42)).to.throw(Error, 'EmailValidator.matchName: pattern is not an instance of RegExp');
    });

    it('Returns itself', () => {
      expect(validator.matchName(/john/)).to.be.an.instanceof(EmailValidator);
      expect(validator.matchName(/jane/)).to.be.an.instanceof(EmailValidator);
    });

    it('Is valid if the local-part of the value matches pattern', () => {
      expect(validator.matchName(/john/).valid()).to.be.true;
    });

    it('Is invalid if the local-part of the value does not match pattern', () => {
      expect(validator.matchName(/jane/).valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error', () => {
      validator.matchName(/jane/);

      expect(validator.errors()[0].type).to.equal('matchName');
      expect(validator.errors()[0].expected).to.equal('/jane/');
      expect(validator.errors()[0].actual).to.equal('john.doe');
    });

  });

  describe('name', () => {

    let validator;

    beforeEach(() => {
      validator = new EmailValidator('john@doe.com');
    });

    it('Throws an Error if query is not of type string', () => {
      expect(validator.name.bind(validator, true)).to.throw(Error, 'EmailValidator.name: query is not of type string');
    });

    it('Returns itself', () => {
      expect(validator.name('john')).to.be.an.instanceof(EmailValidator);
      expect(validator.name('jane')).to.be.an.instanceof(EmailValidator);
    });

    it('Is valid if the local-part of the value email equals query', () => {
      expect(validator.name('john').valid()).to.be.true;
    });

    it('Is invalid if the local-part of the value email equals query in different casing', () => {
      expect(validator.name('John').valid()).to.be.false;
    });

    it('Is invalid if the local-part of the value email does not equal query', () => {
      expect(validator.name('jane').valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error', () => {
      validator.name('jane');

      expect(validator.errors()[0].type).to.equal('name');
      expect(validator.errors()[0].expected).to.equal('jane');
      expect(validator.errors()[0].actual).to.equal('john');
    });

  });

  describe('nameMatch', () => {

    let validator;

    beforeEach(() => {
      validator = new EmailValidator('john.doe@gmail.com');
      validator.matchName = spy();
    });

    it('Calls matchName', () => {
      validator.nameMatch(/john/);

      expect(validator.matchName.calledOnce).to.be.true;
    });

    it('Passes pattern to matchName', () => {
      const regex = /john/;
      validator.nameMatch(regex);

      expect(validator.matchName.calledWithExactly(regex)).to.be.true;
    });

  });

  describe('noThrowAway', () => {

    it('Returns itself', () => {
      const validator = new EmailValidator('john.doe@hotmail.com');
      const validator2 = new EmailValidator('john.doe@yopmail.com');

      expect(validator.noThrowAway()).to.be.an.instanceof(EmailValidator);
      expect(validator2.noThrowAway()).to.be.an.instanceof(EmailValidator);
    });

    it('Is valid if domain is not blacklisted', () => {
      const validEmail = 'john.doe@notatyopmail.com';
      const validator = new EmailValidator(validEmail);

      expect(validator.noThrowAway().valid()).to.be.true;
    });

    it('Is invalid if the domain of the value email ends with a blacklisted domain', () => {
      const a = 'john.doe@yopmail.com';
      const b = 'john.doe@sub.yopmail.com';
      const c = 'john.doe@some.crazy.long.prefix.yopmail.com';

      const validatorA = new EmailValidator(a);
      const validatorB = new EmailValidator(b);
      const validatorC = new EmailValidator(c);

      expect(validatorA.noThrowAway().valid()).to.be.false;
      expect(validatorB.noThrowAway().valid()).to.be.false;
      expect(validatorC.noThrowAway().valid()).to.be.false;
    });

    it('Sets the correct type, expected and actual to the error', () => {
      const validator = new EmailValidator('john.doe@yopmail.com').noThrowAway();

      expect(validator.errors()[0].type).to.equal('noThrowAway');
      expect(validator.errors()[0].expected).to.equal('valid email');
      expect(validator.errors()[0].actual).to.equal('john.doe@yopmail.com');
    });

  });

});
