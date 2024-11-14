import { Test, TestingModule } from '@nestjs/testing';
import { SessionClassTeacherController } from './session-class-teacher.controller';
import { SessionClassTeacherService } from './session-class-teacher.service';
import { CreateSessionClassTeacherDto } from './dto/create-session-class-teacher.dto';
import { UpdateSessionClassTeacherDto } from './dto/update-session-class-teacher.dto';
import { mockSessionClassTeacher } from '@app/common/utils/mock-data';

describe('SessionClassTeacherController', () => {
  let controller: SessionClassTeacherController;
  let service: SessionClassTeacherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionClassTeacherController],
      providers: [
        {
          provide: SessionClassTeacherService,
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

    controller = module.get<SessionClassTeacherController>(
      SessionClassTeacherController,
    );
    service = module.get<SessionClassTeacherService>(
      SessionClassTeacherService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with the correct data', async () => {
      const dto: CreateSessionClassTeacherDto = mockSessionClassTeacher();
      const result = { id: 1, ...dto };

      jest.spyOn(service, 'create').mockResolvedValue(result as any);

      expect(await controller.create(dto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of session class teachers', async () => {
      const result = [{ id: 1 }, { id: 2 }];
      jest.spyOn(service, 'findAll').mockResolvedValue(result as any);

      expect(await controller.findAll()).toEqual(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a session class teacher by ID', async () => {
      const result = { id: 1, session_id: 1, class_id: 2, user_id: 3 };
      jest.spyOn(service, 'findOne').mockResolvedValue(result as any);

      expect(await controller.findOne(1)).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update and return the updated session class teacher', async () => {
      const updateDto: UpdateSessionClassTeacherDto = { class_id: 4 };
      const result = { id: 1, session_id: 1, class_id: 4, user_id: 3 };

      jest.spyOn(service, 'update').mockResolvedValue(result as any);

      expect(await controller.update(1, updateDto)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith(1, updateDto);
    });
  });

  describe('remove', () => {
    it('should remove and return the session class teacher by ID', async () => {
      const result = { id: 1 };
      jest.spyOn(service, 'remove').mockResolvedValue(result as any);

      expect(await controller.remove(1)).toEqual(result);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
