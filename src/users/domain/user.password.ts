import { StringValueObject } from '../../shared/domain/value_object/string.value.object';
import { Encrypt } from '../../shared/infrastructure/utils/encrypt';

export class UserPassword extends StringValueObject {
  private constructor(value: string) {
    super(value);
  }

  public static fromHashed(hash: string): UserPassword {
    return new UserPassword(hash);
  }

  public static fromPlain(plain: string): UserPassword {
    this.ensureLengthIsAtLeast8Characters(plain);

    const hashedValue = Encrypt.hash(plain);
    return new UserPassword(hashedValue);
  }

  public compare(plain: string): boolean {
    return Encrypt.compare(plain, this.name());
  }

  private static ensureLengthIsAtLeast8Characters(value: string): void {
    if (value.length < 8) {
      throw new Error(
        `At least 8 characters is required. Found ${value.length} instead`,
      );
    }
  }
}
