import { Logger } from '@nestjs/common';
import { WelcomeUserEmail } from '../../../notifications/domain/email.welcome.user';
import { EmailSender } from '../../../notifications/domain/email.sender';

export class EmailSenderFake implements EmailSender {
	async send(email: WelcomeUserEmail): Promise<void> {
		Logger.log(`Email sent to ${email.to.getValue()}`);
		return;
	}
}
