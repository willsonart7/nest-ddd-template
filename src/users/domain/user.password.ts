import { StringValueObject } from '../../shared/domain/value_object/string.value.object';

export class UserPassword extends StringValueObject {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): UserPassword {
    this.ensureLengthIsAtLeast8Characters(value);

    return new UserPassword(value);
  }

  private static ensureLengthIsAtLeast8Characters(value: string): void {
    if (value.length < 8) {
      throw new Error(
        `At least 8 characters is required. Found ${value.length} instead`,
      );
    }
  }
}
