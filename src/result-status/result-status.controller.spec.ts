import { Test, TestingModule } from '@nestjs/testing';
import { ResultStatusController } from './result-status.controller';
import { ResultStatusService } from './result-status.service';

describe('ResultStatusController', () => {
  let controller: ResultStatusController;

  const mockResultStatusService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResultStatusController],
      providers: [ResultStatusService],
    })
      .overrideProvider(ResultStatusService)
      .useValue(mockResultStatusService)
      .compile();

    controller = module.get<ResultStatusController>(ResultStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
