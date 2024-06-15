import { Test, TestingModule } from '@nestjs/testing';
import { CombineResultsService } from './combine-results.service';

describe('CombineResultsService', () => {
  let service: CombineResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CombineResultsService],
    }).compile();

    service = module.get<CombineResultsService>(CombineResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
