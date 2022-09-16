import { Test } from '@nestjs/testing';
import { UserMemoryRepository } from 'src/users/infrastructure/persistence/user.memory.repository';
import { SharedModule } from '../../../shared/shared.module';
import { UserCreateService } from './user.create.service';

describe('User', () => {
  let userCreateService: UserCreateService;
  let userRepository: UserMemoryRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [
        UserCreateService,
        {
          provide: UserMemoryRepository,
          useValue: {
            save: (): void => {
              console.log('Saved');
            },
          },
        },
      ],
    }).compile();

    userCreateService = moduleRef.get<UserCreateService>(UserCreateService);
    userRepository = moduleRef.get<UserMemoryRepository>(UserMemoryRepository);
  });

  describe('create', () => {
    it('should be save', async () => {
      const id = '41b8316f-5e68-4b2d-8699-f9189de55399';
      const username = 'warteaga';
      const email = 'email@test.com';
      const password = '1234567';

      jest.spyOn(userRepository, 'save').getMockImplementation();

      await userCreateService.execute(id, email, username, password);

      expect(userRepository.save).toBeCalled();
    });
  });
});
