import { StringValueObject } from '../../shared/domain/value_object/string.value.object';

export class UserUsername extends StringValueObject {
	private constructor(value: string) {
		super(value);
	}

	public static create(value: string): UserUsername {
		return new UserUsername(value);
	}
}
