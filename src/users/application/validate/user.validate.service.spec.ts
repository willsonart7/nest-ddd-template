import { Test } from '@nestjs/testing';
import { UserValidateService } from './user.validate.service';
import { UserMemoryRepository } from '../../infrastructure/persistence/user.memory.repository';
import { UserMother } from '../../../users/domain/__mocks__/domain/user.mother';

describe('User', () => {
	let userValidateService: UserValidateService;
	let userRepository: UserMemoryRepository;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			providers: [
				{
					provide: 'IUserRepository',
					useValue: {
						findByUsername: jest.fn(),
					},
				},
				UserValidateService,
			],
		}).compile();

		userValidateService = moduleRef.get<UserValidateService>(UserValidateService);
		userRepository = moduleRef.get<UserMemoryRepository>('IUserRepository');
	});

	describe('validate', () => {
		it('should be save', async () => {
			const passwordUser = '12345678';
			const mockUser = UserMother.fromPrimitives({
				id: '',
				email: 'test@test.com',
				username: 'test',
				password: passwordUser,
			});

			jest.spyOn(userRepository, 'findByUsername').mockImplementation(async () => mockUser);

			const find = await userValidateService.execute(mockUser.getUsername(), passwordUser);

			expect(userRepository.findByUsername).toBeCalled();
			expect(find.id).toEqual(mockUser.getId());
			expect(find.username).toEqual(mockUser.getUsername());
		});
	});
});
