import { Test, TestingModule } from '@nestjs/testing';
import { AnnouncementsService } from './announcements.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Announcement } from './entities/announcement.entity';

describe('AnnouncementsService', () => {
  let service: AnnouncementsService;

  const mockAnnouncementRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnnouncementsService,
        {
          provide: getRepositoryToken(Announcement),
          useValue: mockAnnouncementRepository,
        },
      ],
    }).compile();

    service = module.get<AnnouncementsService>(AnnouncementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
