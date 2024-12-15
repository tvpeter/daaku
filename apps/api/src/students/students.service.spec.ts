import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { SessionsService } from '@app/sessions/sessions.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  mockSession,
  mockStudent,
  mockStudentDTO,
} from '@app/common/utils/mock-data';
import { StudentCreatedEvent } from './events/student-created.event';
import { SessionStatus } from '@app/common/enums';
import { HttpException, NotFoundException } from '@nestjs/common';
import { UpdateStudentDto } from './dto/update-student.dto';

describe('StudentsService', () => {
  let studentService: StudentsService;
  let eventEmitter: EventEmitter2;

  const mockQueryBuilder = {
    select: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    getMany: jest.fn(),
    getOne: jest.fn(),
    where: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
  };

  const mockStudentsRepository = {
    createQueryBuilder: jest.fn(() => mockQueryBuilder),
    create: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    softRemove: jest.fn(),
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

    const { class_id, session_id, ...rest } = studentDTO;

    expect(mockStudentsRepository.create).toHaveBeenCalledWith(rest);
    expect(mockStudentsRepository.save).toHaveBeenCalledWith(student);
    expect(eventEmitter.emit).toHaveBeenCalledWith(
      'student.registered',
      new StudentCreatedEvent(student.id, class_id, session_id),
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

  describe('findAll', () => {
    it('should return all students without filters', async () => {
      const students = [mockStudent()];

      jest.spyOn(mockStudentsRepository, 'find').mockResolvedValue(students);

      const result = await studentService.findAll({});

      expect(result).toEqual(students);
      expect(mockStudentsRepository.find).toHaveBeenCalledWith({
        select: {
          id: true,
          name: true,
          gender: true,
          admission_number: true,
          created_at: true,
        },
        where: {
          studentSessionClass: {
            class_id: undefined,
            session_id: undefined,
          },
        },
        relations: {
          studentSessionClass: {
            studentClass: true,
            session: true,
          },
        },
      });
    });

    it('should filter students by class_id and session_id', async () => {
      const students = [mockStudent()];
      const query = { class_id: 1, session_id: 2 };

      jest.spyOn(mockStudentsRepository, 'find').mockResolvedValue(students);

      const result = await studentService.findAll(query);

      expect(result).toEqual(students);
      expect(mockStudentsRepository.find).toHaveBeenCalledWith({
        select: {
          id: true,
          name: true,
          gender: true,
          admission_number: true,
          created_at: true,
        },
        where: {
          studentSessionClass: {
            class_id: 1,
            session_id: 2,
          },
        },
        relations: {
          studentSessionClass: {
            studentClass: true,
            session: true,
          },
        },
      });
    });

    it('should filter students by only class_id', async () => {
      const students = [mockStudent()];
      const query = { class_id: 1 };

      jest.spyOn(mockStudentsRepository, 'find').mockResolvedValue(students);

      const result = await studentService.findAll(query);

      expect(result).toEqual(students);
      expect(mockStudentsRepository.find).toHaveBeenCalledWith({
        select: {
          id: true,
          name: true,
          gender: true,
          admission_number: true,
          created_at: true,
        },
        where: {
          studentSessionClass: {
            class_id: 1,
            session_id: undefined,
          },
        },
        relations: {
          studentSessionClass: {
            studentClass: true,
            session: true,
          },
        },
      });
    });

    it('should filter students by only session_id', async () => {
      const students = [mockStudent()];
      const query = { session_id: 2 };

      jest.spyOn(mockStudentsRepository, 'find').mockResolvedValue(students);

      const result = await studentService.findAll(query);

      expect(result).toEqual(students);
      expect(mockStudentsRepository.find).toHaveBeenCalledWith({
        select: {
          id: true,
          name: true,
          gender: true,
          admission_number: true,
          created_at: true,
        },
        where: {
          studentSessionClass: {
            class_id: undefined,
            session_id: 2,
          },
        },
        relations: {
          studentSessionClass: {
            studentClass: true,
            session: true,
          },
        },
      });
    });
  });

  it('should throw a NotFoundException if the student is not found', async () => {
    mockQueryBuilder.getOne.mockResolvedValue(null);

    await expect(studentService.findOne(1)).rejects.toThrow(NotFoundException);

    expect(mockStudentsRepository.createQueryBuilder).toHaveBeenCalledWith(
      'student',
    );
    expect(mockQueryBuilder.where).toHaveBeenCalledWith('student.id = :id', {
      id: 1,
    });
    expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
      'ssc.created_at',
      'DESC',
    );
    expect(mockQueryBuilder.getOne).toHaveBeenCalled();
  });

  it('should update a student', async () => {
    const student = mockStudent();
    const updateStudentDto: UpdateStudentDto = { name: 'Updated Student' };
    const updatedStudent = { ...student, ...updateStudentDto };

    mockStudentsRepository.findOne.mockResolvedValue(student);
    mockStudentsRepository.save.mockResolvedValue(updatedStudent);

    const result = await studentService.update(student.id, updateStudentDto);

    expect(result).toEqual(updatedStudent);
    expect(mockStudentsRepository.findOne).toHaveBeenCalledWith({
      where: { id: student.id },
    });
  });

  it('should remove a student', async () => {
    const student = mockStudent();
    mockStudentsRepository.findOne.mockResolvedValue(student);
    mockStudentsRepository.softRemove.mockResolvedValue(student);

    const result = await studentService.remove(1);

    expect(result).toEqual(student);
    expect(mockStudentsRepository.findOne).toHaveBeenCalledWith({
      where: { id: student.id },
    });
    expect(mockStudentsRepository.softRemove).toHaveBeenCalledWith(student);
  });

  it('should return true if the session is open', async () => {
    const session = mockSession();

    mockSessionService.findOne.mockResolvedValue({
      status: SessionStatus.OPEN,
    });

    const result = await studentService.checkSessionStatus(session.id);

    expect(result).toBe(true);
  });

  it('should throw an error if the session is closed', async () => {
    mockSessionService.findOne.mockResolvedValue({
      status: SessionStatus.CLOSED,
    });

    await expect(studentService.checkSessionStatus(1)).rejects.toThrow(
      HttpException,
    );
  });

  it('should return students in a class for a specific session', async () => {
    const students = [mockStudent()];
    mockStudentsRepository.find.mockResolvedValue(students);

    const result = await studentService.getStudentsInAClassBySession();

    expect(result).toEqual(students);
  });
});
