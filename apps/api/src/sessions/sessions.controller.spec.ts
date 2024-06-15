import { Test, TestingModule } from '@nestjs/testing';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { mockSession, mockSessionDTO } from '@app/common/utils/mock-data';

describe('SessionsController', () => {
  let controller: SessionsController;
  let service: SessionsService;

  const mockSessionsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionsController],
      providers: [
        {
          provide: SessionsService,
          useValue: mockSessionsService,
        },
      ],
    }).compile();

    controller = module.get<SessionsController>(SessionsController);
    service = module.get<SessionsService>(SessionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call session service create with correct parameters', async () => {
    const session = mockSession();
    const sessionDTO: CreateSessionDto = mockSessionDTO(session);

    jest.spyOn(service, 'create').mockResolvedValue(session);

    expect(await controller.create(sessionDTO)).toBe(session);
    expect(service.create).toHaveBeenCalledWith(sessionDTO);
  });
});
