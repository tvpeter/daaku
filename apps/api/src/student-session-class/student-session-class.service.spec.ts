import { Test, TestingModule } from '@nestjs/testing';
import { StudentSessionClassService } from './student-session-class.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StudentSessionClass } from './entities/student-session-class.entity';

describe('StudentSessionClassService', () => {
  let service: StudentSessionClassService;

  const mockReposity = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentSessionClassService,
        {
          provide: getRepositoryToken(StudentSessionClass),
          useValue: mockReposity,
        },
      ],
    }).compile();

    service = module.get<StudentSessionClassService>(
      StudentSessionClassService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
