import { Test } from '@nestjs/testing';
import { UserValidateService } from './user.validate.service';
import { UserMemoryRepository } from '../../infrastructure/persistence/user.memory.repository';
import { User } from 'src/users/domain/user';
import { UserMother } from '../../../users/domain/__mocks__/domain/user.mother';

describe('User', () => {
	let userValidateService: UserValidateService;
	let userRepository: UserMemoryRepository;
	let mockUser: User;
	let passwordUser: string;

	beforeEach(async () => {
		passwordUser = '12345678';
		mockUser = UserMother.fromPrimitives({
			id: '',
			email: 'test@test.com',
			username: 'test',
			password: passwordUser,
		});

		const moduleRef = await Test.createTestingModule({
			providers: [
				{
					provide: 'IUserRepository',
					useValue: {
						findByUsername: (): User => {
							return mockUser;
						},
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
			jest.spyOn(userRepository, 'findByUsername').getMockImplementation();
			const find = await userValidateService.execute(mockUser.username.getValue(), passwordUser);

			expect(userRepository.findByUsername).toBeCalled();
			expect(find.id).toEqual(mockUser.id.getValue());
			expect(find.username).toEqual(mockUser.username.getValue());
		});
	});
});
