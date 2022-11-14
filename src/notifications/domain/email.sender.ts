import { Email } from './email';

export interface EmailSender {
	send(email: Email): Promise<void>;
}
