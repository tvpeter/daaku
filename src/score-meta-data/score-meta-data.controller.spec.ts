import { Test, TestingModule } from '@nestjs/testing';
import { ScoreMetaDataController } from './score-meta-data.controller';
import { ScoreMetaDataService } from './score-meta-data.service';

describe('ScoreMetaDataController', () => {
  let controller: ScoreMetaDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScoreMetaDataController],
      providers: [ScoreMetaDataService],
    }).compile();

    controller = module.get<ScoreMetaDataController>(ScoreMetaDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
