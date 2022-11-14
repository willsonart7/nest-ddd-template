import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Login } from '../../domain/auth.login';

@Injectable()
export class AuthLoginService {
	constructor(private jwtService: JwtService) {}

	async login(id: string, username: string): Promise<Login | undefined> {
		const payload = {
			username,
			sub: id,
		};

		return { access_token: this.jwtService.sign(payload) };
	}
}
