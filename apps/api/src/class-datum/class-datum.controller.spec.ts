import { Test, TestingModule } from '@nestjs/testing';
import { ClassDatumController } from './class-datum.controller';
import { ClassDatumService } from './class-datum.service';
import { CreateClassDatumDto } from './dto/create-class-datum.dto';
import { UpdateClassDatumDto } from './dto/update-class-datum.dto';
import { mockClassDataDTO, mockClassDatum } from '@app/common/utils/mock-data';

const mockClassDatumService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('ClassDatumController', () => {
  let controller: ClassDatumController;
  let service: ClassDatumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassDatumController],
      providers: [
        {
          provide: ClassDatumService,
          useValue: mockClassDatumService,
        },
      ],
    }).compile();

    controller = module.get<ClassDatumController>(ClassDatumController);
    service = module.get<ClassDatumService>(ClassDatumService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a class datum', async () => {
      const classData = mockClassDatum();
      const createClassDatumDto: CreateClassDatumDto = mockClassDataDTO();
      jest.spyOn(service, 'create').mockResolvedValue(classData);

      expect(await controller.create(createClassDatumDto)).toBe(classData);
      expect(service.create).toHaveBeenCalledWith(createClassDatumDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of class data', async () => {
      const classData = [mockClassDatum()];
      jest.spyOn(service, 'findAll').mockResolvedValue(classData);
      expect(await controller.findAll()).toEqual(classData);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single class datum', async () => {
      const data = mockClassDatum();
      jest.spyOn(service, 'findOne').mockResolvedValue(data);

      expect(await controller.findOne(data.id)).toEqual(data);
      expect(service.findOne).toHaveBeenCalledWith(data.id);
    });
  });

  describe('update', () => {
    it('should update a class datum', async () => {
      const data = mockClassDatum();
      const updateClassDatumDto: UpdateClassDatumDto = {
        total_subjects: 12,
      };
      jest
        .spyOn(service, 'update')
        .mockResolvedValue({ ...data, ...updateClassDatumDto });
      expect(await controller.update(data.id, updateClassDatumDto)).toEqual({
        ...data,
        ...updateClassDatumDto,
      });
      expect(service.update).toHaveBeenCalledWith(data.id, updateClassDatumDto);
    });
  });

  describe('remove', () => {
    it('should remove a class datum', async () => {
      const data = mockClassDatum();
      jest.spyOn(service, 'remove').mockResolvedValue({ ...data });
      expect(await controller.remove(data.id)).toEqual({ ...data });
      expect(service.remove).toHaveBeenCalledWith(data.id);
    });
  });
});
