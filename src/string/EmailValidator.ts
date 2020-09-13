import { StringValidator } from './StringValidator';
import { ValidationError } from '../errors/ValidationError';

export class EmailValidator extends StringValidator {
  constructor() {
    super();

    /* Regexp from Philippe Verday his comment @ http://emailregex.com/ */
    this.match(
      /^((?:[-!#$%&'*+/=?^`{|}~\w]|\\.)+(?:\.(?:[-!#$%&'*+/=?^`{|}~\w]|\\.)+)*|"(?:[^\\"]|\\.)+")@(?:\[(?:((?:(?:[01][\d]{0,2}|2(?:[0-4]\d?|5[0-5]?|[6-9])?|[3-9]\d?)\.){3}(?:[01][\d]{0,2}|2(?:[0-4]\d?|5[0-5]?|[6-9])?|[3-9]\d?))|IPv6:((?:[0-9A-F]{1,4}:){7}[0-9A-F]{1,4}|(?:[0-9A-F]{1,4}:){6}:[0-9A-F]{1,4}|(?:[0-9A-F]{1,4}:){5}:(?:[0-9A-F]{1,4}:)?[0-9A-F]{1,4}|(?:[0-9A-F]{1,4}:){4}:(?:[0-9A-F]{1,4}:){0,2}[0-9A-F]{1,4}|(?:[0-9A-F]{1,4}:){3}:(?:[0-9A-F]{1,4}:){0,3}[0-9A-F]{1,4}|(?:[0-9A-F]{1,4}:){2}:(?:[0-9A-F]{1,4}:){0,4}[0-9A-F]{1,4}|[0-9A-F]{1,4}::(?:[0-9A-F]{1,4}:){0,5}[0-9A-F]{1,4}|::(?:[0-9A-F]{1,4}:){0,6}[0-9A-F]{1,4}|(?:[0-9A-F]{1,4}:){1,7}:|(?:[0-9A-F]{1,4}:){6}(?:(?:[01][\d]{0,2}|2(?:[0-4]\d?|5[0-5]?|[6-9])?|[3-9]\d?)\.){3}(?:[01][\d]{0,2}|2(?:[0-4]\d?|5[0-5]?|[6-9])?|[3-9]\d?)|(?:[0-9A-F]{1,4}:){0,5}:(?:(?:[01][\d]{0,2}|2(?:[0-4]\d?|5[0-5]?|[6-9])?|[3-9]\d?)\.){3}(?:[01][\d]{0,2}|2(?:[0-4]\d?|5[0-5]?|[6-9])?|[3-9]\d?)|::(?:[0-9A-F]{1,4}:){0,5}(?:(?:[01][\d]{0,2}|2(?:[0-4]\d?|5[0-5]?|[6-9])?|[3-9]\d?)\.){3}(?:[01][\d]{0,2}|2(?:[0-4]\d?|5[0-5]?|[6-9])?|[3-9]\d?))|([-a-z\d]{0,62}[a-z\d]:[^[\\\]]+))]|([a-z\d](?:[-a-z\d]{0,62}[a-z\d])?(?:\.[a-z\d](?:[-a-z\d]{0,62}[a-z\d])?)+))$/i,
      'email.email'
    );
  }

  /* Expect email to be or match domain `expectedName`. if `expectedDomain` is a string matching will be case-insensitive (RFC 4343) */
  domain(expectedDomain: string | RegExp) {
    if (
      typeof expectedDomain !== 'string' &&
      !(expectedDomain instanceof RegExp)
    )
      throw new TypeError(
        'EmailValidator.domain: expectedDomain must be a string or RegExp'
      );

    this.custom((value: string) => {
      const emailDomain = value.split('@')[1];
      if (
        typeof expectedDomain === 'string' &&
        emailDomain.toLocaleLowerCase() !== expectedDomain.toLocaleLowerCase()
      )
        throw new ValidationError('email.domain', { expectedDomain });

      if (expectedDomain instanceof RegExp && !expectedDomain.test(emailDomain))
        throw new ValidationError('email.domain', {
          expectedDomain: `${expectedDomain}`
        });

      return value;
    });
    return this;
  }

  /** Expect email domain not to be in `blacklist`. */
  domainBlacklist(blacklist: string[]) {
    if (!Array.isArray(blacklist))
      throw new TypeError(
        'EmailValidator.domainBlacklist: blacklist must be an Array'
      );

    this.custom((value: string) => {
      const emailDomain = value.split('@')[1];
      const subjects = emailDomain
        .split('.')
        .map((_, index) => emailDomain.split('.').slice(index).join('.'));
      if (
        subjects.some((domain) =>
          blacklist.includes(domain.toLocaleLowerCase())
        )
      )
        throw new ValidationError('email.domainblacklist', {
          domain: emailDomain
        });

      return value;
    });
    return this;
  }

  /** Expect local part of email to equal or match `expectedName`. if `expectedName` is a string matching will be case-sensitive */
  localPart(expectedName: string | RegExp) {
    return this.name(expectedName);
  }

  /** Expect local part of email to equal or match `expectedName`. if `expectedName` is a string matching will be case-sensitive */
  name(expectedName: string | RegExp) {
    if (typeof expectedName !== 'string' && !(expectedName instanceof RegExp))
      throw new TypeError(
        'EmailValidator.name: expectedName must be a string or RegExp'
      );

    this.custom((value: string) => {
      const localPart = value.split('@')[0];
      if (typeof expectedName === 'string' && localPart !== expectedName)
        throw new ValidationError('email.name', { expectedName });

      if (expectedName instanceof RegExp && !expectedName.test(localPart))
        throw new ValidationError('email.name', {
          expectedName: `${expectedName}`
        });

      return value;
    });
    return this;
  }

  /** Expect email to have TLD in `tlds`  */
  tld(tlds: string | string[]) {
    if (typeof tlds === 'string') tlds = [tlds];
    if (!Array.isArray(tlds))
      throw new TypeError(
        'EmailValidator.tld: tlds must by a string or array of string'
      );

    this.custom((value: string) => {
      const email = value.toLocaleLowerCase();

      for (let tld of tlds) {
        if (email.endsWith(tld.toLocaleLowerCase())) return value;
      }

      throw new ValidationError('email.tld', { tlds: `${tlds}` });
    });
    return this;
  }

  /** Expect email not to have TLD in `tlds` */
  tldBlacklist(tlds: string | string[]) {
    if (typeof tlds === 'string') tlds = [tlds];
    if (!Array.isArray(tlds))
      throw new TypeError(
        'EmailValidator.tldBlacklist: tlds must by a string or array of string'
      );

    this.custom((value: string) => {
      const email = value.toLocaleLowerCase();

      for (let tld of tlds) {
        if (email.endsWith(tld.toLocaleLowerCase()))
          throw new ValidationError('email.tldblacklist', { tld });
      }

      return value;
    });
    return this;
  }
}

export const email = () => new EmailValidator();
