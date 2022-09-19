import { Controller, Req, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Login } from './auth.service';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

export interface RequestWithUser extends Request {
  user: {
    id: string;
    username: string;
    password: string;
  };
}

export interface RequestWithUserToken extends Request {
  user: { id: string; username: string };
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Req() request: RequestWithUser): Promise<Login> {
    const { id, username } = request.user;
    return this.authService.login(id, username);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async check(@Req() request: RequestWithUserToken): Promise<object> {
    return request.user;
  }
}
