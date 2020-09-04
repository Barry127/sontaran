import { BaseValidator } from './BaseValidator';
import { array } from './array/ArrayValidator';
import { boolean } from './boolean/BooleanValidator';
import { email } from './string/EmailValidator';
import { number, integer } from './number/NumberValidator';
import { string } from './string/StringValidator';

export * from './BaseValidator';
export * from './array/ArrayValidator';
export * from './boolean/BooleanValidator';
export * from './number/NumberValidator';
export * from './string/EmailValidator';
export * from './string/StringValidator';

export { badEmailDomains } from './string/badEmailDomains';

export class Sontaran extends BaseValidator {
  static array() {
    return array();
  }

  static boolean() {
    return boolean();
  }

  static bool() {
    return this.boolean();
  }

  static email() {
    return email();
  }

  static int() {
    return integer();
  }

  static integer() {
    return integer();
  }

  static number() {
    return number();
  }

  static string() {
    return string();
  }
}

export default Sontaran;
