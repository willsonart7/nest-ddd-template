import { WelcomeUserEmail } from '../../../notifications/domain/email.welcome.user';
import { EmailSender } from '../../../notifications/domain/email.sender';

export class EmailSenderFake implements EmailSender {
  async send(email: WelcomeUserEmail): Promise<void> {
    console.log(`Email sent to ${email.to.getValue()}`);
    return;
  }
}
