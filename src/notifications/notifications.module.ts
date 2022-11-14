import { Module } from '@nestjs/common';
import { EventEmitterBus } from '../shared/infrastructure/bus/eventEmitter.bus';
import { SharedModule } from '../shared/shared.module';
import { SendWelcomeUserEmail } from './application/sendWelcomeUserEmail/email.user.welcome.sender';
import { SendWelcomeUserEmailOnUserRegistered } from './infrastructure/consumer/email.user.welcome.sender.on.user.created';
import { EmailSenderFake } from './infrastructure/sender/email.sender.fake';

@Module({
	imports: [SharedModule],
	providers: [
		{
			provide: 'IEmailSender',
			useValue: new EmailSenderFake(),
		},
		{
			provide: 'IEventBus',
			useClass: EventEmitterBus,
		},
		SendWelcomeUserEmail,
		SendWelcomeUserEmailOnUserRegistered,
	],
	exports: [],
})
export class NotificationsModule {}
