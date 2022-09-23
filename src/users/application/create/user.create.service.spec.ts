import { Test } from '@nestjs/testing';
import { UserCreateService } from './user.create.service';
import { UserMemoryRepository } from '../../infrastructure/persistence/user.memory.repository';
import { EventEmitterBus } from '../../../shared/infrastructure/bus/eventEmitter.bus';
import { UserMother } from '../../domain/__mocks__/domain/user.mother';

describe('User', () => {
  let userCreateService: UserCreateService;
  let userRepository: UserMemoryRepository;
  let eventEmitterBus: EventEmitterBus;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: 'IUserRepository',
          useValue: {
            save: (): void => {
              return;
            },
          },
        },
        {
          provide: 'IEventBus',
          useValue: {
            publish: (): Promise<void> => {
              return;
            },
          },
        },
        UserCreateService,
      ],
    }).compile();

    userCreateService = moduleRef.get<UserCreateService>(UserCreateService);
    userRepository = moduleRef.get<UserMemoryRepository>('IUserRepository');
    eventEmitterBus = moduleRef.get<EventEmitterBus>('IEventBus');
  });

  describe('create', () => {
    it('should be save', async () => {
      const { id, email, username, password } =
        UserMother.random().toPrimitives();

      jest.spyOn(userRepository, 'save').getMockImplementation();
      jest.spyOn(eventEmitterBus, 'publish').getMockImplementation();

      await userCreateService.execute(id, email, username, password);

      expect(userRepository.save).toBeCalled();
      expect(eventEmitterBus.publish).toBeCalled();
    });
  });
});
