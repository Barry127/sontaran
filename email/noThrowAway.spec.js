const { expect } = require('chai');
const noThrowAway = require('./noThrowAway');

describe('email/noThrowAway', () => {

  const validValues = [
    'john@doe.com',
    'johndoe@hotmail.com',
    'janedoe@notatyopmail.com'
  ];

  const invalidValues = [
    42,
    'johndoe@yopmail.com',
    'johndoe@YopMail.com',
    'john.doe@toiea.com',
    'jane.doe@sub.fastmazda.com',
    'me@some.crazy.long.prefix.zehnminutenmail.de'
  ];

  validValues.forEach(value => {
    it(`${value} is a valid email`, () => {
      expect(noThrowAway(value)).to.be.true;
    });
  });

  invalidValues.forEach(value => {
    it(`${value} is a not valid email`, () => {
      expect(noThrowAway(value)).to.be.false;
    });
  });

});
