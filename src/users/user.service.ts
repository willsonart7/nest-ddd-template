import { Injectable } from '@nestjs/common';

export type User = {
  id: string;
  username: string;
  password: string;
};

@Injectable()
export class UserFinderService {
  private readonly users = [
    {
      id: '1',
      username: 'example',
      password: 'exampl3',
    },
    {
      id: '2',
      username: 'example 2',
      password: 'exampl3',
    },
  ];

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
