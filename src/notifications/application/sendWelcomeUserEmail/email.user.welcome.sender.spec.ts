import { Test } from '@nestjs/testing';
import { EmailSenderFake } from '../../../notifications/infrastructure/sender/email.sender.fake';
import { EmailSender } from '../../../notifications/domain/email.sender';
import { UserMother } from '../../../users/domain/__mocks__/domain/user.mother';
import { SendWelcomeUserEmail } from './email.user.welcome.sender';
import { EmailAddress } from '../../../notifications/domain/email.address';

describe('Welcome email sender', () => {
  let sendWelcomeUserEmail: SendWelcomeUserEmail;
  let emailSender: EmailSender;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: 'EmailSender',
          useValue: {
            send: async (): Promise<void> => {
              return;
            },
          },
        },
        SendWelcomeUserEmail,
      ],
    }).compile();

    sendWelcomeUserEmail =
      moduleRef.get<SendWelcomeUserEmail>(SendWelcomeUserEmail);
    emailSender = moduleRef.get<EmailSenderFake>('EmailSender');
  });

  describe('send', () => {
    it('should send', async () => {
      const { email } = UserMother.random().toPrimitives();

      jest.spyOn(emailSender, 'send').getMockImplementation();

      await sendWelcomeUserEmail.run(new EmailAddress(email));

      expect(emailSender.send).toBeCalled();
    });
  });
});
