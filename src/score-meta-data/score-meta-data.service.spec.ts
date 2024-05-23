import { Test, TestingModule } from '@nestjs/testing';
import { ScoreMetaDataService } from './score-meta-data.service';

describe('ScoreMetaDataService', () => {
  let service: ScoreMetaDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScoreMetaDataService],
    }).compile();

    service = module.get<ScoreMetaDataService>(ScoreMetaDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
