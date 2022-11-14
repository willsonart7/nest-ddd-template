import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '../../../shared/domain/bus/event/event.bus';
import { UserCreatedDomainEvent } from '../../../users/domain/domainEvents/user.created.domain.event';
import { DomainEventSubscriber } from '../../../shared/domain/bus/event/domain.event.subscriber';
import { SendWelcomeUserEmail } from '../../../notifications/application/sendWelcomeUserEmail/email.user.welcome.sender';

type UserCreatedEvent = {
	username: string;
	email: string;
};

@Injectable()
export class SendWelcomeUserEmailOnUserRegistered extends DomainEventSubscriber<UserCreatedDomainEvent> {
	constructor(private sendWelcomeUserEmail: SendWelcomeUserEmail, @Inject('IEventBus') private eventBus: EventBus) {
		super();
		this.eventBus.register(UserCreatedDomainEvent.EVENT_NAME, this.consumer.bind(this));
	}

	async consumer(domainEvent: UserCreatedEvent): Promise<void> {
		await this.sendWelcomeUserEmail.run(domainEvent.email);
	}
}
