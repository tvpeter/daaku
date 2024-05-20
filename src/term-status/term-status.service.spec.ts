import { Test, TestingModule } from '@nestjs/testing';
import { TermStatusService } from './term-status.service';

describe('TermStatusService', () => {
  let service: TermStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TermStatusService],
    }).compile();

    service = module.get<TermStatusService>(TermStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
