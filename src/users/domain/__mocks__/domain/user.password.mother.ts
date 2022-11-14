import { WordMother } from '../../../../shared/domain/__mocks__/word.mother';
import { UserPassword } from '../../user.password';

export class UserPasswordMother {
	static create(value: string): UserPassword {
		return UserPassword.fromPlain(value);
	}

	static random(): UserPassword {
		const min_length = 8;
		return UserPasswordMother.create(WordMother.random(min_length));
	}
}
