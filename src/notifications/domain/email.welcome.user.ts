import { Email } from './email';
import { EmailAddress } from './email.address';

export class WelcomeUserEmail extends Email {
	constructor(to: EmailAddress) {
		super({
			from: new EmailAddress('no-reply@example.com'),
			to,
			subject: 'Welcome to our platform',
			body: 'We are glad to see you here!.',
		});
	}
}
