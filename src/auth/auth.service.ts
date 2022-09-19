import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Nullable } from 'src/shared/domain/Nullable';
import { UserValidateService } from '../users/application/validate/user.validate.service';

export type Login = { access_token: string };

@Injectable()
export class AuthService {
  constructor(
    private userValidateService: UserValidateService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<object> {
    const userLogged: Nullable<object> = await this.userValidateService.execute(
      username,
      password,
    );

    return userLogged;
  }

  async login(id: string, username: string): Promise<Login | undefined> {
    const payload = {
      username,
      sub: id,
    };

    return { access_token: this.jwtService.sign(payload) };
  }
}
