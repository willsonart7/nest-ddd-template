import { Test } from '@nestjs/testing';
import { UserFinderService } from './user.finder.service';
import { UserMemoryRepository } from '../../infrastructure/persistence/user.memory.repository';
import { User } from '../../../users/domain/user';
import { UserMother } from '../../../users/domain/__mocks__/domain/user.mother';
import { UserNotFound } from '../../domain/user.notFound';

describe('User', () => {
	let userFinderService: UserFinderService;
	let userRepository: UserMemoryRepository;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			providers: [
				{
					provide: 'IUserRepository',
					useValue: {
						find: (): User => {
							return;
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
			const mockUser: User = UserMother.random();
			jest.spyOn(userRepository, 'find').mockImplementation(async () => {
				return mockUser;
			});

			const user: User = await userFinderService.execute(mockUser.id.getValue());

			expect(userRepository.find).toBeCalled();
			expect(user).toBeInstanceOf(User);
		});

		it('should be error UserNotFound', async () => {
			const mockUser: User = UserMother.random();

			jest.spyOn(userRepository, 'find').mockImplementation(() => {
				return null;
			});

			try {
				await userFinderService.execute(mockUser.id.getValue());
			} catch (error) {
				expect(error).toBeInstanceOf(UserNotFound);
			}
		});
	});
});
