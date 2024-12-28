import { Test, TestingModule } from '@nestjs/testing';
import { ClassDatumService } from './class-datum.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ClassDatum } from './entities/class-datum.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateClassDatumDto } from './dto/create-class-datum.dto';
import { mockClassDataDTO, mockClassDatum } from '@app/common/utils/mock-data';

const mockRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  softRemove: jest.fn(),
};

describe('ClassDatumService', () => {
  let service: ClassDatumService;
  let repository: Repository<ClassDatum>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClassDatumService,
        {
          provide: getRepositoryToken(ClassDatum),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ClassDatumService>(ClassDatumService);
    repository = module.get<Repository<ClassDatum>>(
      getRepositoryToken(ClassDatum),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new class data', async () => {
      const classDatumDto: CreateClassDatumDto = mockClassDataDTO();
      const data = mockClassDatum();

      jest.spyOn(service, 'checkSessionExists').mockResolvedValue(false);
      jest.spyOn(repository, 'create').mockReturnValue(data as any);
      jest.spyOn(repository, 'save').mockResolvedValue(data);

      const result = await service.create(classDatumDto);
      expect(repository.create).toHaveBeenCalledWith(classDatumDto);
      expect(repository.save).toHaveBeenCalledWith(data);
      expect(result).toEqual(data);
    });

    it('should throw ConflictException if class datum exists', async () => {
      jest.spyOn(service, 'checkSessionExists').mockResolvedValue(true);
      const dto = mockClassDataDTO();

      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return all class data', async () => {
      const mockClassData = [mockClassDatum()];
      jest.spyOn(repository, 'find').mockResolvedValue(mockClassData);
      const result = await service.findAll();

      expect(result).toEqual(mockClassData);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a class datum', async () => {
      const data = mockClassDatum();
      jest.spyOn(repository, 'findOne').mockResolvedValue(data);
      const result = await service.findOne(data.id);

      expect(result).toEqual(data);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: data.id },
      });
    });

    it('should throw NotFoundException if class datum is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a class datum', async () => {
      const data = mockClassDatum();
      const dto = { total_subjects: 14 };
      jest.spyOn(service, 'findOne').mockResolvedValue(data);
      jest.spyOn(repository, 'save').mockResolvedValue({ ...data, ...dto });
      const result = await service.update(data.id, dto);

      expect(result).toEqual({ ...data, ...dto });
      expect(repository.save).toHaveBeenCalledWith({
        ...data,
        ...dto,
      });
    });
  });

  describe('remove', () => {
    it('should remove a class datum', async () => {
      const data = mockClassDatum();
      jest.spyOn(service, 'findOne').mockResolvedValue(data);
      jest.spyOn(repository, 'softRemove').mockResolvedValue(data);
      const result = await service.remove(data.id);

      expect(result).toEqual(data);
      expect(service.findOne).toHaveBeenCalledWith(data.id);
      expect(repository.softRemove).toHaveBeenCalledWith(data);
    });
  });

  describe('checkSessionExists', () => {
    it('should return true if session exists', async () => {
      const data = mockClassDatum();
      jest.spyOn(service, 'checkSessionExists').mockResolvedValue(true);
      jest.spyOn(repository, 'findOne').mockResolvedValue(data);
      const result = await service.checkSessionExists(
        data.session_id,
        data.class_id,
      );

      expect(result).toBe(true);
    });

    it('should return false if session does not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);
      const result = await service.checkSessionExists(2, 2);

      expect(result).toEqual(false);
    });
  });
});
