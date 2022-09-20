import { StringValueObject } from 'src/shared/domain/value_object/string.value.object';

export class UserPassword extends StringValueObject {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): UserPassword {
    return new UserPassword(value);
  }
}
