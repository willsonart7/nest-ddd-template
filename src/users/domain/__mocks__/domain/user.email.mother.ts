import { WordMother } from '../../../../shared/domain/__mocks__/word.mother';
import { UserEmail } from '../../user.email';

export class UserEmailMother {
	static create(value: string): UserEmail {
		return UserEmail.create(value);
	}

	static random(): UserEmail {
		return UserEmailMother.create(`${WordMother.random()}@${WordMother.random()}.com`);
	}
}
