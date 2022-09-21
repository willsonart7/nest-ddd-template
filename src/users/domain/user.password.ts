import { StringValueObject } from '../../shared/domain/value_object/string.value.object';
import { Encrypt } from '../../shared/infrastructure/utils/encrypt';

export class UserPassword extends StringValueObject {
  private constructor(value: string) {
    super(value);
  }

  private static create(value: string): UserPassword {
    this.ensureLengthIsAtLeast8Characters(value);
    return new UserPassword(value);
  }

  public static fromHashed(hash: string): UserPassword {
    return this.create(hash);
  }

  public static fromPlain(plain: string): UserPassword {
    const hashedValue = Encrypt.hash(plain);

    return this.create(hashedValue);
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
