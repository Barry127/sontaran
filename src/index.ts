import { BaseValidator } from './BaseValidator';
import { boolean } from './boolean/BooleanValidator';
import { number, integer } from './number/NumberValidator';
import { string } from './string/StringValidator';

export * from './BaseValidator';
export * from './boolean/BooleanValidator';
export * from './number/NumberValidator';
export * from './string/StringValidator';

export class Sontaran extends BaseValidator {
  static boolean() {
    return boolean();
  }

  static bool() {
    return this.boolean();
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
