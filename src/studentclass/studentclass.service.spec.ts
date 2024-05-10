import { Test, TestingModule } from '@nestjs/testing';
import { StudentclassService } from './studentclass.service';

describe('StudentclassService', () => {
  let service: StudentclassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentclassService],
    }).compile();

    service = module.get<StudentclassService>(StudentclassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
