import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
	@Inject(ConfigService) public config: ConfigService;

	getHello(): string {
		return `Hello World. this is running in ${this.config.get('environment')} mode`;
	}
}
