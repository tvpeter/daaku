import { Test, TestingModule } from '@nestjs/testing';
import { TermStatusController } from './term-status.controller';
import { TermStatusService } from './term-status.service';

describe('TermStatusController', () => {
  let controller: TermStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TermStatusController],
      providers: [TermStatusService],
    }).compile();

    controller = module.get<TermStatusController>(TermStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
