import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../users/user.module';
import { AuthLoginService } from './application/login/auth.login.service';
import { AuthValidateService } from './application/validate/auth.validate.service';
import { LocalStrategy } from './infrastructure/strategies/local.strategy';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { jwtConstants } from './infrastructure/constants';
import { AuthGetController } from './infrastructure/controllers/auth.get.controller';
import { AuthPostController } from './infrastructure/controllers/auth.post.controller';

@Module({
	imports: [
		UserModule,
		PassportModule,
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '60s' },
		}),
	],
	providers: [AuthLoginService, AuthValidateService, LocalStrategy, JwtStrategy],
	controllers: [AuthGetController, AuthPostController],
})
export class AuthModule {}
