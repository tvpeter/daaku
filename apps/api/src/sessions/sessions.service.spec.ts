import { Test, TestingModule } from '@nestjs/testing';
import { SessionsService } from './sessions.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { mockSession, mockSessionDTO } from '@app/common/utils/mock-data';
import { NotFoundException } from '@nestjs/common';
import { UpdateSessionDto } from './dto/update-session.dto';
import { SessionStatus } from '@app/common/enums';

describe('SessionsService', () => {
  let service: SessionsService;

  const mockSessionsRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
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

  it('should return all sessions', async () => {
    const session = mockSession();
    const sessions = [session];

    mockSessionsRepository.find.mockResolvedValue(sessions);

    const result = await service.findAll();

    expect(mockSessionsRepository.find).toHaveBeenCalled();
    expect(result).toEqual(sessions);
  });

  it('should return a single session', async () => {
    const session = mockSession();

    mockSessionsRepository.findOne.mockResolvedValue(session);

    const result = await service.findOne(session.id);

    expect(mockSessionsRepository.findOne).toHaveBeenCalledWith({
      where: { id: session.id },
    });
    expect(result).toEqual(session);
  });

  it('should throw a NotFoundException if session is not found', async () => {
    mockSessionsRepository.findOne.mockResolvedValue(null);

    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
  });

  it('should update a session', async () => {
    const session = mockSession();

    const updateSessionDto: UpdateSessionDto = { status: SessionStatus.CLOSED };
    mockSessionsRepository.findOne.mockResolvedValue(session);
    mockSessionsRepository.save.mockResolvedValue({
      ...session,
      ...updateSessionDto,
    });

    const result = await service.update(session.id, updateSessionDto);
    expect(mockSessionsRepository.save).toHaveBeenCalledWith({
      ...session,
      ...updateSessionDto,
    });
    expect(result).toEqual({ ...session, ...updateSessionDto });
  });

  it('should remove an existing session', async () => {
    const session = mockSession();

    mockSessionsRepository.findOne.mockResolvedValue(session);
    mockSessionsRepository.remove.mockResolvedValue(session);

    const result = await service.remove(session.id);

    expect(mockSessionsRepository.findOne).toHaveBeenCalledWith({
      where: { id: session.id },
    });
    expect(mockSessionsRepository.remove).toHaveBeenCalledWith(session);
    expect(result).toEqual(session);
  });

  it('should return status of session', async () => {
    const session = mockSession();

    mockSessionsRepository.findOne.mockResolvedValue(session);

    const result = await service.checkSessionIsOpen(session.id);

    expect(mockSessionsRepository.findOne).toHaveBeenCalledWith({
      where: { id: session.id },
    });
    expect(result).toEqual(true);
  });
});
