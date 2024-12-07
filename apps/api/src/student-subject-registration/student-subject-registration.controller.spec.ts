import { Test, TestingModule } from '@nestjs/testing';
import { StudentSubjectRegistrationController } from './student-subject-registration.controller';
import { StudentSubjectRegistrationService } from './student-subject-registration.service';

describe('StudentSubjectRegistrationController', () => {
  let controller: StudentSubjectRegistrationController;
  let service: StudentSubjectRegistrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentSubjectRegistrationController],
      providers: [
        {
          provide: StudentSubjectRegistrationService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<StudentSubjectRegistrationController>(
      StudentSubjectRegistrationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // describe('create student-subject-registraiton', () => {

  // })
});
