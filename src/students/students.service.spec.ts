import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { SessionsService } from '@app/sessions/sessions.service';

describe('StudentsService', () => {
  let service: StudentsService;

  const mockStudentsRepository = {};
  const mockSessionService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        SessionsService,
        {
          provide: getRepositoryToken(Student),
          useValue: mockStudentsRepository,
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
