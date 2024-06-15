import { Test, TestingModule } from '@nestjs/testing';
import { ScoreMetaDataService } from './score-meta-data.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ScoreMetaDatum } from './entities/score-meta-datum.entity';

describe('ScoreMetaDataService', () => {
  let service: ScoreMetaDataService;
  const mockScoreMetaDatumRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScoreMetaDataService,
        {
          provide: getRepositoryToken(ScoreMetaDatum),
          useValue: mockScoreMetaDatumRepository,
        },
      ],
    }).compile();

    service = module.get<ScoreMetaDataService>(ScoreMetaDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
