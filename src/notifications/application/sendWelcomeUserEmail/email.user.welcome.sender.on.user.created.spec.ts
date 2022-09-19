import { Test } from '@nestjs/testing';
import { UserMother } from '../../../users/domain/__mocks__/domain/user.mother';
import { SendWelcomeUserEmail } from './email.user.welcome.sender';
import { SendWelcomeUserEmailOnUserRegistered } from './email.user.welcome.sender.on.user.created';
import { UserCreatedDomainEvent } from '../../../users/domain/domainEvents/user.created.domain.event';
import { EmailSender } from '../../../notifications/domain/email.sender';
import { EmailSenderFake } from 'src/notifications/infrastructure/sender/email.sender.fake';

describe('Welcome email on user.created domain event', () => {
  let sendWelcomeUserEmailOnUserRegistered: SendWelcomeUserEmailOnUserRegistered;
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
        SendWelcomeUserEmailOnUserRegistered,
      ],
    }).compile();

    sendWelcomeUserEmail =
      moduleRef.get<SendWelcomeUserEmail>(SendWelcomeUserEmail);
    sendWelcomeUserEmailOnUserRegistered =
      moduleRef.get<SendWelcomeUserEmailOnUserRegistered>(
        SendWelcomeUserEmailOnUserRegistered,
      );
    emailSender = moduleRef.get<EmailSenderFake>('EmailSender');
  });

  describe('send', () => {
    it('should send', async () => {
      const { id, email, username } = UserMother.random().toPrimitives();

      jest.spyOn(sendWelcomeUserEmail, 'run').getMockImplementation();
      jest.spyOn(emailSender, 'send').getMockImplementation();

      await sendWelcomeUserEmailOnUserRegistered.execute(
        new UserCreatedDomainEvent({
          id,
          email,
          username,
        }),
      );

      expect(sendWelcomeUserEmail.run).toBeCalled();
      expect(emailSender.send).toBeCalled();
    });
  });
});
