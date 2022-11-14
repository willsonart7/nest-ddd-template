import { WordMother } from '../../../../shared/domain/__mocks__/word.mother';
import { UserUsername } from '../../user.username';

export class UserUsernameMother {
	static create(value: string): UserUsername {
		return UserUsername.create(value);
	}

	static random(): UserUsername {
		return UserUsernameMother.create(WordMother.random());
	}
}
