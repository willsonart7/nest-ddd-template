import { AggregateRoot } from 'src/shared/domain/aggregate/aggregate.root';
import { UserId } from './user.id';
import { UserEmail } from './user.email';
import { UserUsername } from './user.username';
import { UserPassword } from './user.password';

interface UserProps {
  id: UserId;
  email: UserEmail;
  username: UserUsername;
  password: UserPassword;
}

interface UserPrimitiveProps {
  id: string;
  email: string;
  username: string;
  password?: string;
}

export class User extends AggregateRoot<UserProps> {
  public readonly id: UserId;
  public readonly email: UserEmail;
  public readonly username: UserUsername;
  private password: UserPassword;

  private constructor(props: UserProps, id: UserId) {
    super(props, id);

    this.id = id;
    this.email = props.email;
    this.username = props.username;
    this.password = props.password;
  }

  public static create(props: UserProps, id: UserId): User {
    return new User(props, id);
  }

  public static fromPrimitives(props: UserPrimitiveProps): User {
    const id = UserId.create(props.id);
    const email = UserEmail.create(props.email);
    const username = UserUsername.create(props.username);
    const password = UserPassword.create(props.password);

    return User.create({ id, email, username, password }, id);
  }

  public toPrimitives(): UserPrimitiveProps {
    return {
      id: this.id.getValue(),
      email: this.email.name(),
      username: this.username.name(),
      password: this.password.name(),
    };
  }
}
