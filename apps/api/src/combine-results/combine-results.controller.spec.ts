import { Test, TestingModule } from '@nestjs/testing';
import { CombineResultsController } from './combine-results.controller';
import { CombineResultsService } from './combine-results.service';

describe('CombineResultsController', () => {
  let controller: CombineResultsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CombineResultsController],
      providers: [CombineResultsService],
    }).compile();

    controller = module.get<CombineResultsController>(CombineResultsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
