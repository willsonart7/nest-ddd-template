import { StringValueObject } from '../../shared/domain/value_object/string.value.object';

export class UserEmail extends StringValueObject {
  private constructor(value: string) {
    super(value);
    this.ensureFormatIsValid(value);
  }

  public static create(value: string): UserEmail {
    return new UserEmail(value);
  }

  private ensureFormatIsValid(value: string): void {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regex.test(value)) {
      throw new Error('Email format is not valid.');
    }
  }
}
