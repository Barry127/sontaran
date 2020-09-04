import { StringValidator } from './StringValidator';

export class EmailValidator extends StringValidator {
  constructor() {
    super();

    /* Regexp from Philippe Verday his comment @ http://emailregex.com/ */
    this.match(
      /^((?:[-!#$%&'*+/=?^`{|}~\w]|\\.)+(?:\.(?:[-!#$%&'*+/=?^`{|}~\w]|\\.)+)*|"(?:[^\\"]|\\.)+")@(?:\[(?:((?:(?:[01][\d]{0,2}|2(?:[0-4]\d?|5[0-5]?|[6-9])?|[3-9]\d?)\.){3}(?:[01][\d]{0,2}|2(?:[0-4]\d?|5[0-5]?|[6-9])?|[3-9]\d?))|IPv6:((?:[0-9A-F]{1,4}:){7}[0-9A-F]{1,4}|(?:[0-9A-F]{1,4}:){6}:[0-9A-F]{1,4}|(?:[0-9A-F]{1,4}:){5}:(?:[0-9A-F]{1,4}:)?[0-9A-F]{1,4}|(?:[0-9A-F]{1,4}:){4}:(?:[0-9A-F]{1,4}:){0,2}[0-9A-F]{1,4}|(?:[0-9A-F]{1,4}:){3}:(?:[0-9A-F]{1,4}:){0,3}[0-9A-F]{1,4}|(?:[0-9A-F]{1,4}:){2}:(?:[0-9A-F]{1,4}:){0,4}[0-9A-F]{1,4}|[0-9A-F]{1,4}::(?:[0-9A-F]{1,4}:){0,5}[0-9A-F]{1,4}|::(?:[0-9A-F]{1,4}:){0,6}[0-9A-F]{1,4}|(?:[0-9A-F]{1,4}:){1,7}:|(?:[0-9A-F]{1,4}:){6}(?:(?:[01][\d]{0,2}|2(?:[0-4]\d?|5[0-5]?|[6-9])?|[3-9]\d?)\.){3}(?:[01][\d]{0,2}|2(?:[0-4]\d?|5[0-5]?|[6-9])?|[3-9]\d?)|(?:[0-9A-F]{1,4}:){0,5}:(?:(?:[01][\d]{0,2}|2(?:[0-4]\d?|5[0-5]?|[6-9])?|[3-9]\d?)\.){3}(?:[01][\d]{0,2}|2(?:[0-4]\d?|5[0-5]?|[6-9])?|[3-9]\d?)|::(?:[0-9A-F]{1,4}:){0,5}(?:(?:[01][\d]{0,2}|2(?:[0-4]\d?|5[0-5]?|[6-9])?|[3-9]\d?)\.){3}(?:[01][\d]{0,2}|2(?:[0-4]\d?|5[0-5]?|[6-9])?|[3-9]\d?))|([-a-z\d]{0,62}[a-z\d]:[^[\\\]]+))]|([a-z\d](?:[-a-z\d]{0,62}[a-z\d])?(?:\.[a-z\d](?:[-a-z\d]{0,62}[a-z\d])?)+))$/i
    );
  }

  /* Expect email to be or match domain `expectedName`. if `expectedDomain` is a string matching will be case-insensitive (RFC 4343) */
  domain(expectedDomain: string | RegExp) {
    if (
      typeof expectedDomain !== 'string' &&
      !(expectedDomain instanceof RegExp)
    )
      throw new TypeError(
        'EmailValidator domain: expectedDomain must be a string or RegExp'
      );

    this.validators.push((value: string) => {
      const emailDomain = value.split('@')[1];
      return typeof expectedDomain === 'string'
        ? emailDomain.toLocaleLowerCase() === expectedDomain.toLocaleLowerCase()
        : expectedDomain.test(emailDomain);
    });
    return this;
  }

  /** Expect email domain not to be in `blacklist`. */
  domainBlacklist(blacklist: string[]) {
    if (!Array.isArray(blacklist))
      throw new TypeError(
        'EmailValidator domainBlacklist: blacklist must be an Array'
      );

    this.validators.push((value: string) => {
      const emailDomain = value.split('@')[1];
      const subjects = emailDomain
        .split('.')
        .map((_, index) => emailDomain.split('.').slice(index).join('.'));
      return !subjects.some((domain) =>
        blacklist.includes(domain.toLocaleLowerCase())
      );
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
        'EmailValidator name: expectedName must be a string or RegExp'
      );

    this.validators.push((value: string) => {
      const localPart = value.split('@')[0];
      return typeof expectedName === 'string'
        ? localPart === expectedName
        : expectedName.test(localPart);
    });
    return this;
  }
}

export const email = () => new EmailValidator();
