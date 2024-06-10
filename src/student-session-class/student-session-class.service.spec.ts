import { Test, TestingModule } from '@nestjs/testing';
import { StudentSessionClassService } from './student-session-class.service';

describe('StudentSessionClassService', () => {
  let service: StudentSessionClassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentSessionClassService],
    }).compile();

    service = module.get<StudentSessionClassService>(StudentSessionClassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
