import { Test, TestingModule } from '@nestjs/testing';
import { ScoresService } from './scores.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import { ResultStatusService } from '@app/result-status/result-status.service';

describe('ScoresService', () => {
  let service: ScoresService;

  const mockScoresRepository = {};
  const mockResultStatusService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScoresService,
        ResultStatusService,
        {
          provide: getRepositoryToken(Score),
          useValue: mockScoresRepository,
        },
      ],
    })
      .overrideProvider(ResultStatusService)
      .useValue(mockResultStatusService)
      .compile();

    service = module.get<ScoresService>(ScoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
