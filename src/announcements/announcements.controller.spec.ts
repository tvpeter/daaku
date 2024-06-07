import { Test, TestingModule } from '@nestjs/testing';
import { AnnouncementsController } from './announcements.controller';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import {
  createMockAnnouncement,
  extractCreateAnnouncementDto,
} from '@app/common/utils/mock-data';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { AnnouncementStatus } from '@app/common/enums';

describe('AnnouncementsController', () => {
  let announcementController: AnnouncementsController;
  let announcementService: AnnouncementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnnouncementsController],
      providers: [
        {
          provide: AnnouncementsService,
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

    announcementController = module.get<AnnouncementsController>(
      AnnouncementsController,
    );
    announcementService =
      module.get<AnnouncementsService>(AnnouncementsService);
  });

  it('should be defined', () => {
    expect(announcementController).toBeDefined();
  });

  it('should call Announcement create with the correct parameters', async () => {
    const mockAnnouncement = createMockAnnouncement();

    const createAnnouncementDtO: CreateAnnouncementDto =
      extractCreateAnnouncementDto(mockAnnouncement);

    jest
      .spyOn(announcementService, 'create')
      .mockResolvedValue(mockAnnouncement);

    expect(await announcementController.create(createAnnouncementDtO)).toBe(
      mockAnnouncement,
    );
    expect(announcementService.create).toHaveBeenCalledWith(
      createAnnouncementDtO,
    );
  });

  it('should return all announcements', async () => {
    const mockAnnouncement = createMockAnnouncement();

    const result = [mockAnnouncement];

    jest.spyOn(announcementService, 'findAll').mockResolvedValue(result);

    expect(await announcementController.findAll()).toBe(result);
    expect(announcementService.findAll).toHaveBeenCalled();
  });

  it('should return a single announcement', async () => {
    const mockAnnouncement = createMockAnnouncement();

    const result = { id: expect.any(Number), ...mockAnnouncement };

    jest.spyOn(announcementService, 'findOne').mockResolvedValue(result);
    expect(await announcementController.findOne(1)).toBe(result);
    expect(announcementService.findOne).toHaveBeenCalledWith(1);
  });

  it('should call AnnouncementService update with the correct parameters', async () => {
    const updateAnnouncementDto: UpdateAnnouncementDto = {
      status: AnnouncementStatus.IN_REVIEW,
    };
    const mockAnnouncement = createMockAnnouncement();
    const result = { id: expect.any(Number), ...mockAnnouncement };

    jest.spyOn(announcementService, 'update').mockResolvedValue(result);

    expect(await announcementController.update(1, updateAnnouncementDto)).toBe(
      result,
    );
    expect(announcementService.update).toHaveBeenCalledWith(
      1,
      updateAnnouncementDto,
    );
  });

  it('should call Announcement remove with the correct id', async () => {
    const mockAnnouncement = createMockAnnouncement();
    const result = { id: 1, ...mockAnnouncement };

    jest.spyOn(announcementService, 'remove').mockResolvedValue(result);

    expect(await announcementController.remove(1)).toBe(result);
    expect(announcementService.remove).toHaveBeenCalledWith(1);
  });
});
