import { AggregateRoot } from '../../shared/domain/aggregate/aggregate.root';
import { UserId } from './user.id';
import { UserEmail } from './user.email';
import { UserUsername } from './user.username';
import { UserPassword } from './user.password';
import { UserCreatedDomainEvent } from './domainEvents/user.created.domain.event';

export interface UserProps {
	id: UserId;
	email: UserEmail;
	username: UserUsername;
	password: UserPassword;
}

export interface UserPrimitiveProps {
	id: string;
	email: string;
	username: string;
	password?: string;
}

export class User extends AggregateRoot {
	readonly id: UserId;
	readonly email: UserEmail;
	readonly username: UserUsername;
	readonly password: UserPassword;

	private constructor(props: UserProps) {
		super();
		this.id = props.id;
		this.email = props.email;
		this.username = props.username;
		this.password = props.password;
	}

	public static create(props: UserProps): User {
		const user = new User(props);
		user.addDomainEvent(
			new UserCreatedDomainEvent({
				id: props.id.getValue(),
				email: props.email.getValue(),
				username: props.username.getValue(),
			}),
		);

		return user;
	}

	public static fromPrimitives(props: UserPrimitiveProps): User {
		const id = UserId.create(props.id);
		const email = UserEmail.create(props.email);
		const username = UserUsername.create(props.username);
		const password = UserPassword.fromHashed(props.password);

		return User.create({ id, email, username, password });
	}

	public toPrimitives(): UserPrimitiveProps {
		return {
			id: this.id.getValue(),
			email: this.email.getValue(),
			username: this.username.getValue(),
			password: this.password.getValue(),
		};
	}

	public toReponse(): UserPrimitiveProps {
		return {
			id: this.id.getValue(),
			email: this.email.getValue(),
			username: this.username.getValue(),
		};
	}
}
