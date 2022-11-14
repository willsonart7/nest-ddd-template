import { UniqueValueObject } from '../../shared/domain/value_object/unique.value.object';
import { EmailAddress } from './email.address';
import { EmailId } from './email.id';

type EmailProps = {
	id?: EmailId;
	from: EmailAddress;
	to: EmailAddress;
	subject: string;
	body: string;
};

export class Email {
	readonly id: EmailId;
	readonly from: EmailAddress;
	readonly to: EmailAddress;
	readonly subject: string;
	readonly body: string;

	constructor(props: EmailProps) {
		this.id = props.id || new EmailId(new UniqueValueObject().getValue());
		this.from = props.from;
		this.to = props.to;
		this.subject = props.subject;
		this.body = props.body;
	}
}
