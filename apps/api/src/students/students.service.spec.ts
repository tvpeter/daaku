import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { SessionsService } from '@app/sessions/sessions.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { mockStudent, mockStudentDTO } from '@app/common/utils/mock-data';
import { Repository } from 'typeorm';
import { StudentCreatedEvent } from './events/student-created.event';
import { SessionStatus } from '@app/common/enums';
import { HttpException, NotFoundException } from '@nestjs/common';

describe('StudentsService', () => {
  let studentService: StudentsService;
  let studentRepository: Repository<Student>;
  let sessionService: SessionsService;
  let eventEmitter: EventEmitter2;

  const mockStudentsRepository = {
    create: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    save: jest.fn(),
  };
  const mockSessionService = {
    findOne: jest.fn(),
  };
  const mockEventEmitter = {
    emit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: getRepositoryToken(Student),
          useValue: mockStudentsRepository,
        },
        {
          provide: EventEmitter2,
          useValue: mockEventEmitter,
        },
        {
          provide: SessionsService,
          useValue: mockSessionService,
        },
      ],
    }).compile();

    studentService = module.get<StudentsService>(StudentsService);
    studentRepository = module.get<Repository<Student>>(
      getRepositoryToken(Student),
    );
    sessionService = module.get<SessionsService>(SessionsService);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  it('should be defined', () => {
    expect(studentService).toBeDefined();
  });

  it('should create a student', async () => {
    const student = mockStudent();
    const studentDTO = mockStudentDTO(student);

    mockStudentsRepository.create.mockReturnValue(student);
    mockStudentsRepository.save.mockResolvedValue(student);
    mockSessionService.findOne.mockResolvedValue({
      status: SessionStatus.OPEN,
    });

    await studentService.create(studentDTO);

    expect(mockStudentsRepository.create).toHaveBeenCalledWith(studentDTO);
    expect(mockStudentsRepository.save).toHaveBeenCalledWith(student);
    expect(eventEmitter.emit).toHaveBeenCalledWith(
      'student.registered',
      new StudentCreatedEvent(
        student.id,
        student.current_class_id,
        student.current_session_id,
      ),
    );
  });
  it('should throw an error if the session is closed', async () => {
    const student = mockStudent();
    const createStudentDto = mockStudentDTO(student);

    mockSessionService.findOne.mockResolvedValue({
      status: SessionStatus.CLOSED,
    });

    await expect(studentService.create(createStudentDto)).rejects.toThrow(
      HttpException,
    );
  });

  it('should return all students', async () => {
    const students = [mockStudent()];
    mockStudentsRepository.find.mockResolvedValue(students);

    const result = await studentService.findAll();

    expect(result).toEqual(students);
    expect(studentRepository.find).toHaveBeenCalled();
  });

  it('should return a student by ID', async () => {
    const student = mockStudent();
    mockStudentsRepository.findOne.mockResolvedValue(student);

    const result = await studentService.findOne(student.id);

    expect(result).toEqual(student);
    expect(studentRepository.findOne).toHaveBeenCalledWith({
      where: { id: student.id },
    });
  });

  it('should throw a NotFoundException if the student is not found', async () => {
    mockStudentsRepository.findOne.mockResolvedValue(null);

    await expect(studentService.findOne(1)).rejects.toThrow(NotFoundException);
  });
});
