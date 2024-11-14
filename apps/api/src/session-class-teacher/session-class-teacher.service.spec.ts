import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SessionClassTeacherService } from './session-class-teacher.service';
import { SessionClassTeacher } from './entities/session-class-teacher.entity';
import { CreateSessionClassTeacherDto } from './dto/create-session-class-teacher.dto';
import { UpdateSessionClassTeacherDto } from './dto/update-session-class-teacher.dto';
import { mockSessionClassTeacher } from '@app/common/utils/mock-data';

describe('SessionClassTeacherService', () => {
  let service: SessionClassTeacherService;
  let repository: Repository<SessionClassTeacher>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionClassTeacherService,
        {
          provide: getRepositoryToken(SessionClassTeacher),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<SessionClassTeacherService>(
      SessionClassTeacherService,
    );
    repository = module.get<Repository<SessionClassTeacher>>(
      getRepositoryToken(SessionClassTeacher),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a new session class teacher', async () => {
      const dto: CreateSessionClassTeacherDto = mockSessionClassTeacher();

      jest.spyOn(service, 'checkRecordExists').mockResolvedValue(null);
      jest.spyOn(repository, 'create').mockReturnValue(dto as any);
      jest.spyOn(repository, 'save').mockResolvedValue(dto as any);

      const result = await service.create(dto);
      expect(result).toEqual(dto);
      expect(service.checkRecordExists).toHaveBeenCalledWith(dto);
      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(repository.save).toHaveBeenCalledWith(dto);
    });

    it('should throw ConflictException if record exists', async () => {
      const dto: CreateSessionClassTeacherDto = mockSessionClassTeacher();
      jest
        .spyOn(service, 'checkRecordExists')
        .mockResolvedValue({} as SessionClassTeacher);

      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return all session class teachers', async () => {
      const teachers = [{ id: 1 }, { id: 2 }];
      jest.spyOn(repository, 'find').mockResolvedValue(teachers as any);

      const result = await service.findAll();
      expect(result).toEqual(teachers);
    });
  });

  describe('findOne', () => {
    it('should return a session class teacher if found', async () => {
      const sessionClassTeacher = mockSessionClassTeacher();
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(sessionClassTeacher as any);

      const result = await service.findOne(1);
      expect(result).toEqual(sessionClassTeacher);
    });

    it('should throw NotFoundException if teacher not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a session class teacher', async () => {
      const updateDto: UpdateSessionClassTeacherDto = { class_id: 3 };
      const existingTeacher = mockSessionClassTeacher();
      const updatedTeacher = { ...existingTeacher, ...updateDto };

      jest.spyOn(service, 'findOne').mockResolvedValue(existingTeacher as any);
      jest.spyOn(repository, 'save').mockResolvedValue(updatedTeacher as any);

      const result = await service.update(existingTeacher.id, updateDto);
      expect(result).toEqual(updatedTeacher);
      expect(service.findOne).toHaveBeenCalledWith(existingTeacher.id);
      expect(repository.save).toHaveBeenCalledWith(updatedTeacher);
    });
  });

  describe('remove', () => {
    it('should remove a session class teacher', async () => {
      const sessionClassTeacher = mockSessionClassTeacher();
      jest
        .spyOn(service, 'findOne')
        .mockResolvedValue(sessionClassTeacher as any);
      jest
        .spyOn(repository, 'remove')
        .mockResolvedValue(sessionClassTeacher as any);

      const result = await service.remove(1);
      expect(result).toEqual(sessionClassTeacher);
      expect(service.findOne).toHaveBeenCalledWith(sessionClassTeacher.id);
      expect(repository.remove).toHaveBeenCalledWith(sessionClassTeacher);
    });
  });

  describe('checkRecordExists', () => {
    it('should return a session class teacher if record exists', async () => {
      const dto: CreateSessionClassTeacherDto = mockSessionClassTeacher();
      const newSessionClassTeacher = { id: 1, ...dto };

      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(newSessionClassTeacher as any);

      const result = await service.checkRecordExists(dto);
      expect(result).toEqual(newSessionClassTeacher);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: {
          session_id: dto.session_id,
          class_id: dto.class_id,
          user_id: dto.user_id,
        },
      });
    });

    it('should return null if record does not exist', async () => {
      const dto: CreateSessionClassTeacherDto = mockSessionClassTeacher();

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      const result = await service.checkRecordExists(dto);
      expect(result).toBeNull();
    });
  });
});
