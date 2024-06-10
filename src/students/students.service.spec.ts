import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { SessionsService } from '@app/sessions/sessions.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('StudentsService', () => {
  let service: StudentsService;

  const mockStudentsRepository = {};
  const mockSessionService = {};
  const eventEmitter = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        SessionsService,
        {
          provide: getRepositoryToken(Student),
          useValue: mockStudentsRepository,
        },
        {
          provide: EventEmitter2,
          useValue: eventEmitter,
        },
      ],
    })
      .overrideProvider(SessionsService)
      .useValue(mockSessionService)
      .compile();

    service = module.get<StudentsService>(StudentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
