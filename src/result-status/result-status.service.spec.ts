import { Test, TestingModule } from '@nestjs/testing';
import { ResultStatusService } from './result-status.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ResultStatus } from './entities/result-status.entity';

describe('ResultStatusService', () => {
  let service: ResultStatusService;

  const mockResultStatusRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResultStatusService,
        {
          provide: getRepositoryToken(ResultStatus),
          useValue: mockResultStatusRepository,
        },
      ],
    }).compile();

    service = module.get<ResultStatusService>(ResultStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
