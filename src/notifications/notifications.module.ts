import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { SendWelcomeUserEmail } from './application/sendWelcomeUserEmail/email.user.welcome.sender';
import { SendWelcomeUserEmailOnUserRegistered } from './application/sendWelcomeUserEmail/email.user.welcome.sender.on.user.created';
import { EmailSenderFake } from './infrastructure/sender/email.sender.fake';

@Module({
  imports: [SharedModule],
  providers: [
    {
      provide: 'EmailSender',
      useValue: new EmailSenderFake(),
    },
    SendWelcomeUserEmail,
    SendWelcomeUserEmailOnUserRegistered,
  ],
  exports: [],
})
export class NotificationsModule {}
