import { BaseValidator } from './BaseValidator';
import { boolean } from './boolean/BooleanValidator';
import { string } from './string/StringValidator';

export * from './BaseValidator';
export * from './boolean/BooleanValidator';
export * from './string/StringValidator';

export class Sontaran extends BaseValidator {
  static boolean() {
    return boolean();
  }

  static bool() {
    return this.boolean();
  }

  static string() {
    return string();
  }
}

export default Sontaran;
