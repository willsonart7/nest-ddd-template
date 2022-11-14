import { UniqueValueObject } from '../../shared/domain/value_object/unique.value.object';

export class UserId extends UniqueValueObject {
	private constructor(value: string) {
		super(value);
	}

	public static create(value: string): UserId {
		return new UserId(value);
	}
}
