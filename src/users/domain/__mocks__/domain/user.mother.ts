import { User, UserProps, UserPrimitiveProps } from '../../user';
import { UserEmail } from '../../user.email';
import { UserId } from '../../user.id';
import { UserPassword } from '../../user.password';
import { UserUsername } from '../../user.username';
import { UserEmailMother } from './user.email.mother';
import { UserIdMother } from './user.id.mother';
import { UserPasswordMother } from './user.password.mother';
import { UserUsernameMother } from './user.username.mother';

export class UserMother {
	static create(props: UserProps): User {
		return User.create(props);
	}

	static random(): User {
		return UserMother.create({
			id: UserIdMother.random(),
			username: UserUsernameMother.random(),
			email: UserEmailMother.random(),
			password: UserPasswordMother.random(),
		});
	}

	static fromPrimitives(props: UserPrimitiveProps): User {
		return UserMother.create({
			id: UserId.create(props.id),
			email: UserEmail.create(props.email),
			username: UserUsername.create(props.username),
			password: UserPassword.fromPlain(props.password),
		});
	}
}
