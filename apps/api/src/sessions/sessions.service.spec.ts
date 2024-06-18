import { Test, TestingModule } from '@nestjs/testing';
import { SessionsService } from './sessions.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { mockSession, mockSessionDTO } from '@app/common/utils/mock-data';

describe('SessionsService', () => {
  let service: SessionsService;

  const mockSessionsRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionsService,
        {
          provide: getRepositoryToken(Session),
          useValue: mockSessionsRepository,
        },
      ],
    }).compile();

    service = module.get<SessionsService>(SessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new session', async () => {
    const session: Session = mockSession();

    const sessionDto = mockSessionDTO(session);

    mockSessionsRepository.create.mockResolvedValue(session);
    mockSessionsRepository.save.mockResolvedValue(session);

    const result = await service.create(sessionDto);

    expect(mockSessionsRepository.create).toHaveBeenCalledWith(sessionDto);
    expect(result).toEqual(session);
  });
});
