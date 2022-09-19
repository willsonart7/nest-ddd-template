import { Test } from '@nestjs/testing';
import { UserValidateService } from './user.validate.service';
import { UserMemoryRepository } from '../../infrastructure/persistence/user.memory.repository';
import { User } from 'src/users/domain/user';
import { UserMother } from '../../../users/domain/__mocks__/domain/user.mother';

describe('User', () => {
  let userValidateService: UserValidateService;
  let userRepository: UserMemoryRepository;
  let mockUser: User;

  beforeEach(async () => {
    mockUser = UserMother.random();

    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: 'UserRepository',
          useValue: {
            findAll: (): User[] => {
              return [mockUser];
            },
          },
        },
        UserValidateService,
      ],
    }).compile();

    userValidateService =
      moduleRef.get<UserValidateService>(UserValidateService);
    userRepository = moduleRef.get<UserMemoryRepository>('UserRepository');
  });

  describe('validate', () => {
    it('should be save', async () => {
      jest.spyOn(userRepository, 'findAll').getMockImplementation();

      const find = await userValidateService.execute(
        mockUser.username.name(),
        mockUser.password.name(),
      );

      expect(userRepository.findAll).toBeCalled();
      expect(find.id).toEqual(mockUser.id.getValue());
      expect(find.username).toEqual(mockUser.username.name());
    });
  });
});
