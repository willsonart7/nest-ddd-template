import { Test } from '@nestjs/testing';
import { UserFinderService } from './user.finder.service';
import { UserMemoryRepository } from '../../infrastructure/persistence/user.memory.repository';
import { User } from '../../../users/domain/user';
import { UserMother } from '../../../users/domain/__mocks__/domain/user.mother';

describe('User', () => {
  let userFinderService: UserFinderService;
  let userRepository: UserMemoryRepository;
  let mockUser: User;

  beforeEach(async () => {
    mockUser = UserMother.random();

    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: 'IUserRepository',
          useValue: {
            find: (): User => {
              return mockUser;
            },
          },
        },
        UserFinderService,
      ],
    }).compile();

    userFinderService = moduleRef.get<UserFinderService>(UserFinderService);
    userRepository = moduleRef.get<UserMemoryRepository>('IUserRepository');
  });

  describe('find', () => {
    it('should be find', async () => {
      jest.spyOn(userRepository, 'find').getMockImplementation();

      const find = await userFinderService.execute(mockUser.id.getValue());

      expect(userRepository.find).toBeCalled();
      expect(find).toBeInstanceOf(User);
      expect(find.id.getValue()).toEqual(mockUser.id.getValue());
    });
  });
});
