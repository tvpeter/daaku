import { Test, TestingModule } from '@nestjs/testing';
import { ResultsService } from './results.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';

describe('ResultsService', () => {
  let service: ResultsService;

  const mockResultsRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResultsService,
        {
          provide: getRepositoryToken(Result),
          useValue: mockResultsRepository,
        },
      ],
    }).compile();

    service = module.get<ResultsService>(ResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
