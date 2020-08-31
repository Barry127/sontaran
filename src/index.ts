import { BaseValidator } from './BaseValidator';
import { boolean } from './boolean/BooleanValidator';

export * from './BaseValidator';
export * from './boolean/BooleanValidator';

export class Sontaran extends BaseValidator {
  static boolean() {
    return boolean();
  }

  static bool() {
    return this.boolean();
  }
}

export default Sontaran;
