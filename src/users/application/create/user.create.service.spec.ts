import { Test } from '@nestjs/testing';
import { UserCreatorService } from './user.creator.service';
import { UserMemoryRepository } from '../../infrastructure/persistence/user.memory.repository';
import { EventEmitterBus } from '../../../shared/infrastructure/bus/eventEmitter.bus';
import { UserMother } from '../../../users/domain/__mocks__/domain/user.mother';

describe('User', () => {
  let userCreatorService: UserCreatorService;
  let userRepository: UserMemoryRepository;
  let eventEmitterBus: EventEmitterBus;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: 'UserRepository',
          useValue: {
            save: (): void => {
              return;
            },
          },
        },
        {
          provide: 'EventBus',
          useValue: {
            publish: (): Promise<void> => {
              return;
            },
          },
        },
        UserCreatorService,
      ],
    }).compile();

    userCreatorService = moduleRef.get<UserCreatorService>(UserCreatorService);
    userRepository = moduleRef.get<UserMemoryRepository>('UserRepository');
    eventEmitterBus = moduleRef.get<EventEmitterBus>('EventBus');
  });

  describe('create', () => {
    it('should be save', async () => {
      const { id, email, username, password } =
        UserMother.random().toPrimitives();

      jest.spyOn(userRepository, 'save').getMockImplementation();
      jest.spyOn(eventEmitterBus, 'publish').getMockImplementation();

      await userCreatorService.execute(id, email, username, password);

      expect(userRepository.save).toBeCalled();
      expect(eventEmitterBus.publish).toBeCalled();
    });
  });
});
