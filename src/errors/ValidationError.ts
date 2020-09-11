import { LocaleDef } from '../types';

export class ValidationError extends Error {
  public context: ErrorContext;
  private formattedMessage?: string;

  constructor(message: string, context: ErrorContext = {}) {
    super(message);

    Object.setPrototypeOf(this, ValidationError.prototype);

    this.context = context;
  }

  format(label: string, locale: LocaleDef) {
    if (this.formattedMessage) return this.formattedMessage;

    if (!locale[this.message]) {
      this.formattedMessage = this.message;
      return this.formattedMessage;
    }

    this.formattedMessage = locale[this.message].replace(
      new RegExp('{{label}}', 'g'),
      label
    );

    this.formattedMessage = Object.entries(this.context).reduce(
      (formattedMessage, [key, value]) => {
        return formattedMessage.replace(new RegExp(`{{${key}}}`), value);
      },
      this.formattedMessage
    );

    return this.formattedMessage;
  }
}

interface ErrorContext {
  [key: string]: string;
}
