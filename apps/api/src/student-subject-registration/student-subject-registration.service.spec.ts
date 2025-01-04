import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StudentSubjectRegistrationService } from './student-subject-registration.service';
import { StudentSubjectRegistration } from './entities/student-subject-registration.entity';
import { SessionsService } from '@app/sessions/sessions.service';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

const mockRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  softRemove: jest.fn(),
  count: jest.fn(),
  findOneById: jest.fn(),
};

const mockSessionService = {
  checkSessionIsOpen: jest.fn(),
};

describe('StudentSubjectRegistrationService', () => {
  let service: StudentSubjectRegistrationService;
  let repository: Repository<StudentSubjectRegistration>;
  let sessionService: SessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentSubjectRegistrationService,
        {
          provide: getRepositoryToken(StudentSubjectRegistration),
          useValue: mockRepository,
        },
        {
          provide: SessionsService,
          useValue: mockSessionService,
        },
      ],
    }).compile();

    service = module.get<StudentSubjectRegistrationService>(
      StudentSubjectRegistrationService,
    );
    repository = module.get<Repository<StudentSubjectRegistration>>(
      getRepositoryToken(StudentSubjectRegistration),
    );
    sessionService = module.get<SessionsService>(SessionsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(sessionService).toBeDefined();
  });

  describe('create', () => {
    const dto = {
      student_id: 1,
      class_id: 1,
      session_id: 1,
      subject_id: 1,
    };

    it('should throw ConflictException if the subject is already registered', async () => {
      jest.spyOn(service, 'checkRegistrationExists').mockResolvedValue(true);

      await expect(service.create(dto)).rejects.toThrow(ConflictException);
      expect(service.checkRegistrationExists).toHaveBeenCalledWith(dto);
    });

    it('should throw BadRequestException if the session is closed', async () => {
      jest.spyOn(service, 'checkRegistrationExists').mockResolvedValue(false);
      jest.spyOn(sessionService, 'checkSessionIsOpen').mockResolvedValue(false);

      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
      expect(sessionService.checkSessionIsOpen).toHaveBeenCalledWith(
        dto.session_id,
      );
    });

    it('should create and save a new subject registration', async () => {
      jest.spyOn(service, 'checkRegistrationExists').mockResolvedValue(false);
      jest.spyOn(sessionService, 'checkSessionIsOpen').mockResolvedValue(true);
      jest.spyOn(repository, 'create').mockReturnValue(dto as any);
      jest.spyOn(repository, 'save').mockResolvedValue(dto as any);

      const result = await service.create(dto);

      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(repository.save).toHaveBeenCalledWith(dto);
      expect(result).toEqual(dto);
    });
  });

  describe('findAll', () => {
    it('should return all registrations when no filters are provided', async () => {
      const registrations = [{ id: 1 }, { id: 2 }];
      jest.spyOn(repository, 'find').mockResolvedValue(registrations as any);

      const result = await service.findAll({});

      expect(repository.find).toHaveBeenCalledWith({
        where: {},
        relations: {},
      });
      expect(result).toEqual(registrations);
    });

    it('should return filtered registrations when filters are provided', async () => {
      const registrations = [{ id: 1 }];
      const query = { class_id: 1, session_id: 2 };

      jest.spyOn(repository, 'find').mockResolvedValue(registrations as any);

      const result = await service.findAll(query);

      expect(repository.find).toHaveBeenCalledWith({
        where: { class_id: 1, session_id: 2 },
        relations: { studentClass: true, session: true },
      });
      expect(result).toEqual(registrations);
    });

    it('should handle partial filters', async () => {
      const registrations = [{ id: 2 }];
      const query = { subject_id: 3 };

      jest.spyOn(repository, 'find').mockResolvedValue(registrations as any);

      const result = await service.findAll(query);

      expect(repository.find).toHaveBeenCalledWith({
        where: { subject_id: 3 },
        relations: { subject: true },
      });
      expect(result).toEqual(registrations);
    });
  });

  describe('findStudentSubjects', () => {
    it('should return student subjects for the session', async () => {
      const studentSubjects = [{ id: 1 }];
      const query = {
        student_id: 1,
        class_id: 2,
        session_id: 3,
      };

      jest.spyOn(repository, 'find').mockResolvedValue(studentSubjects as any);

      const result = await service.findStudentSubjects(query);

      expect(repository.find).toHaveBeenCalledWith({
        where: query,
        relations: {
          subject: true,
          session: true,
          studentClass: true,
        },
      });
      expect(result).toEqual(studentSubjects);
    });
  });

  describe('findOneById', () => {
    it('should throw NotFoundException if the registration is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOneById(1)).rejects.toThrow(NotFoundException);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should return the registration if found', async () => {
      const registration = { id: 1 };
      jest.spyOn(repository, 'findOne').mockResolvedValue(registration as any);

      const result = await service.findOneById(1);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(registration);
    });
  });

  describe('update', () => {
    it('should update the registration if found', async () => {
      const existingRegistration = { id: 1 };
      const updateDto = { class_id: 2 };
      jest
        .spyOn(service, 'findOneById')
        .mockResolvedValue(existingRegistration as any);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue({ ...existingRegistration, ...updateDto } as any);

      const result = await service.update(1, updateDto);

      expect(service.findOneById).toHaveBeenCalledWith(existingRegistration.id);
      expect(repository.save).toHaveBeenCalledWith({
        ...existingRegistration,
        ...updateDto,
      });
      expect(result).toEqual({ ...existingRegistration, ...updateDto });
    });
  });

  describe('remove', () => {
    it('should remove the registration if found', async () => {
      const registration = { id: 1 };
      jest.spyOn(service, 'findOneById').mockResolvedValue(registration as any);
      jest
        .spyOn(repository, 'softRemove')
        .mockResolvedValue(registration as any);

      const result = await service.remove(1);

      expect(service.findOneById).toHaveBeenCalledWith(1);
      expect(repository.softRemove).toHaveBeenCalledWith(registration);
      expect(result).toEqual(registration);
    });
  });
});
