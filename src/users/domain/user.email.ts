import { DomainError } from '../../shared/domain/DomainError';
import { StringValueObject } from '../../shared/domain/value_object/string.value.object';

export class UserEmail extends StringValueObject {
	private constructor(value: string) {
		super(value);
	}

	public static create(value: string): UserEmail {
		this.ensureFormatIsValid(value);
		return new UserEmail(value);
	}

	private static ensureFormatIsValid(value: string): void {
		const regex =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (!regex.test(value)) {
			throw new DomainError('Email format is not valid.');
		}
	}
}
