import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/user';
import { UserRepository } from '../../domain/user.repository';
import { Nullable } from '../../../shared/domain/Nullable';
import { UserUsername } from '../../domain/user.username';
import { UserPassword } from '../../domain/user.password';

type ValidateReturn = {
	id: string;
	username: string;
	email: string;
};

@Injectable()
export class UserValidateService {
	constructor(@Inject('IUserRepository') private readonly repository: UserRepository) {}

	async execute(username: string, password: string): Promise<Nullable<ValidateReturn>> {
		const user: Nullable<User> = await this.repository.findByUsername(
			UserUsername.create(username),
		);

		if (!user) return null;

		const userPassword = UserPassword.fromHashed(user.password.getValue());
		return userPassword.compare(password) ? user.toReponse() : null;
	}
}
