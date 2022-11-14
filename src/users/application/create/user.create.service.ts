import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/user';
import { UserEmail } from '../../domain/user.email';
import { UserId } from '../../domain/user.id';
import { UserPassword } from '../../domain/user.password';
import { UserUsername } from '../../domain/user.username';
import { UserRepository } from '../../domain/user.repository';
import { EventBus } from '../../../shared/domain/bus/event/event.bus';

@Injectable()
export class UserCreateService {
	constructor(
		@Inject('IUserRepository') private readonly repository: UserRepository,
		@Inject('IEventBus') private readonly eventBus: EventBus,
	) {}

	async execute(id: string, email: string, username: string, password: string): Promise<void> {
		const userId = UserId.create(id);
		const userEmail = UserEmail.create(email);
		const userUsername = UserUsername.create(username);
		const userPassword = UserPassword.fromPlain(password);

		// userValidate for email

		// userValidate for username

		const user = User.create({
			id: userId,
			email: userEmail,
			username: userUsername,
			password: userPassword,
		});

		await this.repository.save(user);
		await this.eventBus.publish(user.domainEvents);

		user.clearEvents();
	}
}
