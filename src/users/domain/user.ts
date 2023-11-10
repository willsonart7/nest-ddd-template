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

export interface UserResponseProps {
	id: string;
	email: string;
	username: string;
}

export class User extends AggregateRoot {
	private readonly id: UserId;
	private readonly email: UserEmail;
	private readonly username: UserUsername;
	private readonly password: UserPassword;

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
				id: user.id.getValue(),
				user,
				eventId: user.id.getValue(),
				occurredOn: new Date().toISOString(),
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

	public getId(): string {
		return this.id.getValue();
	}

	public getEmail(): string {
		return this.email.getValue();
	}

	public getUsername(): string {
		return this.username.getValue();
	}

	public getPassword(): string {
		return this.password.getValue();
	}

	public comparePassword(plain: string): boolean {
		return this.password.compare(plain);
	}

	public toPrimitives(): UserPrimitiveProps {
		return {
			id: this.id.getValue(),
			email: this.email.getValue(),
			username: this.username.getValue(),
			password: this.password.getValue(),
		};
	}

	public toReponse(): UserResponseProps {
		return {
			id: this.id.getValue(),
			email: this.email.getValue(),
			username: this.username.getValue(),
		};
	}
}
