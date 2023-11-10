import { Inject, Injectable } from '@nestjs/common';
import { User, UserResponseProps } from '../../domain/user';
import { UserRepository } from '../../domain/user.repository';
import { Nullable } from '../../../shared/domain/Nullable';
import { UserUsername } from '../../domain/user.username';

@Injectable()
export class UserValidateService {
	constructor(@Inject('IUserRepository') private readonly repository: UserRepository) {}

	async execute(username: string, passwordRaw: string): Promise<Nullable<UserResponseProps>> {
		const user: Nullable<User> = await this.repository.findByUsername(UserUsername.create(username));

		if (!user) return null;

		const validatePassword = user.comparePassword(passwordRaw);
		if (!validatePassword) return null;

		return user.toReponse();
	}
}
