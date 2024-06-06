import { Test, TestingModule } from '@nestjs/testing';
import { AnnouncementsController } from './announcements.controller';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import {
  createMockAnnouncement,
  extractCreateAnnouncementDto,
} from '@app/common/utils/mock-data';

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

    const result = { id: expect.any(Number), ...mockAnnouncement };

    jest.spyOn(announcementService, 'create').mockResolvedValue(result);

    expect(await announcementController.create(createAnnouncementDtO)).toBe(
      result,
    );
    expect(announcementService.create).toHaveBeenCalledWith(
      createAnnouncementDtO,
    );
  });
});
