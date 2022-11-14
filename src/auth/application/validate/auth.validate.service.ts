import { Injectable } from '@nestjs/common';
import { Nullable } from 'src/shared/domain/Nullable';
import { UserValidateService } from '../../../users/application/validate/user.validate.service';

@Injectable()
export class AuthValidateService {
	constructor(private userValidateService: UserValidateService) {}

	async validateUser(username: string, password: string): Promise<object> {
		const userLogged: Nullable<object> = await this.userValidateService.execute(username, password);

		return userLogged;
	}
}
