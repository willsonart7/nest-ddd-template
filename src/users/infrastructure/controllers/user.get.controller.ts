import { Controller, HttpCode, UseGuards, Get, Req, Param, ParseUUIDPipe } from '@nestjs/common';
import { UserFinderService } from '../../application/find/user.finder.service';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';
import { ControllerResponse } from '../../../shared/infrastructure/filters/response.decorator';

export interface RequestWithUser extends Request {
	user: { id: string; username: string };
}

@Controller('user')
export class UserGetController {
	constructor(private userFinder: UserFinderService) {}

	@UseGuards(JwtAuthGuard)
	@Get('test')
	@ControllerResponse('Test route')
	async execute(@Req() request: RequestWithUser): Promise<string> {
		return `Hello, ${request.user.username}`;
	}

	@Get(':id')
	@HttpCode(200)
	@ControllerResponse()
	async getUser(@Param('id', ParseUUIDPipe) id: string): Promise<object> {
		const UserFound: { id: string; email: string; username: string } = (
			await this.userFinder.execute(id)
		).toReponse();

		return UserFound;
	}
}
