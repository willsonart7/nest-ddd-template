import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserFinderService } from '../users/user.service';

export type Login = { access_token: string };

@Injectable()
export class AuthService {
  constructor(
    private userFinderService: UserFinderService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user: User = await this.userFinderService.findOneByUsername(username);
    if (!user) {
      return null;
    }
    if (user.password !== password) {
      return null;
    }
    return user;
  }

  async login(user: User): Promise<Login | undefined> {
    const payload = {
      username: user.username,
      sub: user.id,
    };

    return { access_token: this.jwtService.sign(payload) };
  }
}
