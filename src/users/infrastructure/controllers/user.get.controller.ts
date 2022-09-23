import { Controller, UseGuards, Get, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';

export interface RequestWithUser extends Request {
  user: { id: string; username: string };
}

@Controller('user')
export class UserGetController {
  @UseGuards(JwtAuthGuard)
  @Get('test')
  async execute(@Req() request: RequestWithUser): Promise<string> {
    return `Hello, ${request.user.username}`;
  }
}
