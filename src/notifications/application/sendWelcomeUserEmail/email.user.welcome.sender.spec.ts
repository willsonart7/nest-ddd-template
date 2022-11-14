import { Test } from '@nestjs/testing';
import { EmailSenderFake } from '../../../notifications/infrastructure/sender/email.sender.fake';
import { EmailSender } from '../../../notifications/domain/email.sender';
import { UserMother } from '../../../users/domain/__mocks__/domain/user.mother';
import { SendWelcomeUserEmail } from './email.user.welcome.sender';

describe('Notifications', () => {
	let sendWelcomeUserEmail: SendWelcomeUserEmail;
	let emailSender: EmailSender;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			providers: [
				{
					provide: 'IEmailSender',
					useValue: {
						send: async (): Promise<void> => {
							return;
						},
					},
				},
				SendWelcomeUserEmail,
			],
		}).compile();

		sendWelcomeUserEmail = moduleRef.get<SendWelcomeUserEmail>(SendWelcomeUserEmail);
		emailSender = moduleRef.get<EmailSenderFake>('IEmailSender');
	});

	describe('Send welcome user email', () => {
		it('should send', async () => {
			const { email } = UserMother.random().toPrimitives();

			jest.spyOn(emailSender, 'send').getMockImplementation();

			await sendWelcomeUserEmail.run(email);

			expect(emailSender.send).toBeCalled();
		});
	});
});
