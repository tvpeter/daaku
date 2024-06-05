import { Test, TestingModule } from '@nestjs/testing';
import { SubjectsService } from './subjects.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';

describe('SubjectsService', () => {
  let service: SubjectsService;

  const mockSubjectsRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubjectsService,
        {
          provide: getRepositoryToken(Subject),
          useValue: mockSubjectsRepository,
        },
      ],
    }).compile();

    service = module.get<SubjectsService>(SubjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
