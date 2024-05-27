import { Test, TestingModule } from '@nestjs/testing';
import { CombineScoresService } from './combine-scores.service';

describe('CombineScoresService', () => {
  let service: CombineScoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CombineScoresService],
    }).compile();

    service = module.get<CombineScoresService>(CombineScoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
