import { Controller, Req, UseGuards, Get } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

export interface RequestWithUserToken extends Request {
  user: { id: string; username: string };
}

@Controller('auth')
export class AuthGetController {
  @UseGuards(JwtAuthGuard)
  @Get()
  async check(@Req() request: RequestWithUserToken): Promise<object> {
    return request.user;
  }
}
