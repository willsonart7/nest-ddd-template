import { Controller, Req, Get, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { Login } from './auth.service';
import { User } from '../users/user.service';
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: User;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser): Promise<Login> {
    return this.authService.login(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('info')
  async info(@Req() request: RequestWithUser): Promise<User> {
    return request.user;
  }
}
