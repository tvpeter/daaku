import { Test, TestingModule } from '@nestjs/testing';
import { StudentclassService } from './studentclass.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Studentclass } from './entities/studentclass.entity';

describe('StudentclassService', () => {
  let service: StudentclassService;

  const mockStudentClassRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentclassService,
        {
          provide: getRepositoryToken(Studentclass),
          useValue: mockStudentClassRepository,
        },
      ],
    }).compile();

    service = module.get<StudentclassService>(StudentclassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
