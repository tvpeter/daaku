import { Test, TestingModule } from '@nestjs/testing';
import { ScoreMetaDataService } from './score-meta-data.service';

describe('ScoreMetaDataService', () => {
  let service: ScoreMetaDataService;
  const mockScoreMetaDataService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScoreMetaDataService],
    })
      .overrideProvider(ScoreMetaDataService)
      .useValue(mockScoreMetaDataService)
      .compile();

    service = module.get<ScoreMetaDataService>(ScoreMetaDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
