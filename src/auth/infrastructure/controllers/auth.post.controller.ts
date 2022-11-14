import { Controller, Req, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Login } from '../../domain/auth.login';
import { Request } from 'express';
import { AuthLoginService } from '../../application/login/auth.login.service';
import { ControllerResponse } from '../../../shared/infrastructure/filters/response.decorator';

export interface RequestWithUser extends Request {
	user: {
		id: string;
		username: string;
		password: string;
	};
}

@Controller('auth')
export class AuthPostController {
	constructor(private authService: AuthLoginService) {}

	@UseGuards(LocalAuthGuard)
	@Post()
	@ControllerResponse('Login user')
	async login(@Req() request: RequestWithUser): Promise<Login> {
		const { id, username } = request.user;
		return this.authService.login(id, username);
	}
}
