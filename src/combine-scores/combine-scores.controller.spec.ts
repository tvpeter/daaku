import { Test, TestingModule } from '@nestjs/testing';
import { CombineScoresController } from './combine-scores.controller';
import { CombineScoresService } from './combine-scores.service';

describe('CombineScoresController', () => {
  let controller: CombineScoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CombineScoresController],
      providers: [CombineScoresService],
    }).compile();

    controller = module.get<CombineScoresController>(CombineScoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
