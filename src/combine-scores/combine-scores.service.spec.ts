import { Test, TestingModule } from '@nestjs/testing';
import { CombineScoresService } from './combine-scores.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CombineScore } from './entities/combine-score.entity';

describe('CombineScoresService', () => {
  let service: CombineScoresService;

  const mockCombineScoreRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CombineScoresService,
        {
          provide: getRepositoryToken(CombineScore),
          useValue: mockCombineScoreRepository,
        },
      ],
    }).compile();

    service = module.get<CombineScoresService>(CombineScoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
