import { Controller, Req, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Login } from '../../auth.service';
import { Request } from 'express';
import { AuthLoginService } from '../../application/login/auth.login.service';

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
  async login(@Req() request: RequestWithUser): Promise<Login> {
    const { id, username } = request.user;
    return this.authService.login(id, username);
  }
}
