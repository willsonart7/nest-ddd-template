import { Inject } from '@nestjs/common';
import { EmailSender } from '../../domain/email.sender';
import { EmailAddress } from '../../domain/email.address';
import { WelcomeUserEmail } from '../../domain/email.welcome.user';

export class SendWelcomeUserEmail {
	constructor(
		@Inject('IEmailSender')
		private emailSender: EmailSender,
	) {}

	async run(userEmailAddress: string): Promise<void> {
		const welcomeUserEmail = new WelcomeUserEmail(new EmailAddress(userEmailAddress));
		try {
			await this.emailSender.send(welcomeUserEmail);
		} catch (error) {
			throw new Error(`Error ocurred`);
		}
	}
}
