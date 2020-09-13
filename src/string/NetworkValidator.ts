import { StringValidator } from './StringValidator';
import { ValidationError } from '../errors/ValidationError';
import { ValidatorOptions } from '../types';

export class NetworkValidator extends StringValidator {
  /** expect value to be a valid ip address */
  ip() {
    return this.custom((value: string) => {
      if (value.includes(':') && ipv6RegExp.test(value)) return value;

      return ipv4(value, 'network.ip');
    });
  }

  /** Expect value to be a valid IPv4 address */
  ipv4() {
    return this.custom(ipv4);
  }

  /** Expect value to be a valid IPv6 address */
  ipv6() {
    return this.match(ipv6RegExp, 'network.ipv6');
  }

  /** Expect value to be a valid MAC address */
  mac() {
    return this.match(/^([0-9a-f]{2}:){5}[0-9a-f]{2}$/i, 'network.mac');
  }

  /** Expect email to have TLD in `tlds`  */
  tld(tlds: string | string[]) {
    if (typeof tlds === 'string') tlds = [tlds];
    if (!Array.isArray(tlds))
      throw new TypeError(
        'EmailValidator.tld: tlds must by a string or array of string'
      );

    return this.custom((value: string) => {
      let domain = value.replace('://', '').split('/')[0].toLocaleLowerCase();
      if (domain.includes(':')) domain = domain.split(':')[0];
      if (domain.includes('?')) domain = domain.split('?')[0];
      if (domain.includes('#')) domain = domain.split('#')[0];

      for (let tld of tlds) {
        if (domain.endsWith(tld.toLocaleLowerCase())) return value;
      }

      throw new ValidationError('network.tld', { tlds: `${tlds}` });
    });
  }

  /** Expect email not to have TLD in `tlds` */
  tldBlacklist(tlds: string | string[]) {
    if (typeof tlds === 'string') tlds = [tlds];
    if (!Array.isArray(tlds))
      throw new TypeError(
        'EmailValidator.tld: tlds must by a string or array of string'
      );

    return this.custom((value: string) => {
      let domain = value.replace('://', '').split('/')[0].toLocaleLowerCase();
      if (domain.includes(':')) domain = domain.split(':')[0];
      if (domain.includes('?')) domain = domain.split('?')[0];
      if (domain.includes('#')) domain = domain.split('#')[0];

      for (let tld of tlds) {
        if (domain.endsWith(tld.toLocaleLowerCase()))
          throw new ValidationError('network.tldblacklist', { tld });
      }

      return value;
    });
  }

  /** Expect value to be a valid URL */
  url() {
    /* https://urlregex.com */
    return this.match(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
      'network.url'
    );
  }
}

export const network = (options: Partial<ValidatorOptions> = {}) =>
  new NetworkValidator(options);

const ipv4 = (value: string, message: string = 'network.ipv4'): string => {
  const parts = value.split('.');

  if (parts.length !== 4) throw new ValidationError(message);

  for (let part of parts) {
    if (part.length > 1 && part.startsWith('0'))
      throw new ValidationError(message);

    const numericValue = parseInt(part, 10);
    if (numericValue < 0 || numericValue > 255)
      throw new ValidationError(message);
  }

  return value;
};

const ipv6RegExp = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
