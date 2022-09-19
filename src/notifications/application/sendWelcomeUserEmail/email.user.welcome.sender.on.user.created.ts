import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EmailAddress } from '../../../notifications/domain/email.address';
import { UserCreatedDomainEvent } from '../../../users/domain/domainEvents/user.created.domain.event';
import { SendWelcomeUserEmail } from './email.user.welcome.sender';

@Injectable()
export class SendWelcomeUserEmailOnUserRegistered {
  constructor(private sendWelcomeUserEmail: SendWelcomeUserEmail) {}

  @OnEvent(UserCreatedDomainEvent.EVENT_NAME, { async: true })
  async execute(domainEvent: UserCreatedDomainEvent): Promise<void> {
    const userEmailAddress = new EmailAddress(domainEvent.email);
    await this.sendWelcomeUserEmail.run(userEmailAddress);
  }
}
