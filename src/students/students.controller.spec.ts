import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

describe('StudentsController', () => {
  let controller: StudentsController;

  const mockStudentsService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
      providers: [StudentsService],
    })
      .overrideProvider(StudentsService)
      .useValue(mockStudentsService)
      .compile();

    controller = module.get<StudentsController>(StudentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
