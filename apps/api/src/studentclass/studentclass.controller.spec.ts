import { Test, TestingModule } from '@nestjs/testing';
import { StudentclassController } from './studentclass.controller';
import { StudentclassService } from './studentclass.service';

describe('StudentclassController', () => {
  let controller: StudentclassController;

  const mockStudentClassService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentclassController],
      providers: [StudentclassService],
    })
      .overrideProvider(StudentclassService)
      .useValue(mockStudentClassService)
      .compile();

    controller = module.get<StudentclassController>(StudentclassController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
