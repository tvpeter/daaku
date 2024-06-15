import { Test, TestingModule } from '@nestjs/testing';
import { AnnouncementsService } from './announcements.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Announcement } from './entities/announcement.entity';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import {
  createMockAnnouncement,
  extractCreateAnnouncementDto,
} from '@app/common/utils/mock-data';
import { NotFoundException } from '@nestjs/common';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { AnnouncementStatus } from '@app/common/enums';

describe('AnnouncementsService', () => {
  let service: AnnouncementsService;

  const mockAnnouncementRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

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

  it('should create a new announcement', async () => {
    const announcement: Announcement = createMockAnnouncement();
    const createAnnouncementDto: CreateAnnouncementDto =
      extractCreateAnnouncementDto(announcement);

    mockAnnouncementRepository.create.mockReturnValue(announcement);
    mockAnnouncementRepository.save.mockResolvedValue(announcement);

    const result = await service.create(createAnnouncementDto);

    expect(mockAnnouncementRepository.create).toHaveBeenCalledWith(
      createAnnouncementDto,
    );
    expect(mockAnnouncementRepository.save).toHaveBeenCalledWith(announcement);
    expect(result).toEqual(announcement);
  });

  it('should return an array of announcements', async () => {
    const announcement = createMockAnnouncement();
    const announcements = [announcement];

    mockAnnouncementRepository.find.mockResolvedValue(announcements);

    const result = await service.findAll();

    expect(mockAnnouncementRepository.find).toHaveBeenCalled();
    expect(result).toEqual(announcements);
  });

  it('should return a single announcement', async () => {
    const announcement = createMockAnnouncement();

    mockAnnouncementRepository.findOne.mockResolvedValue(announcement);

    const result = await service.findOne(announcement.id);

    expect(mockAnnouncementRepository.findOne).toHaveBeenCalledWith({
      where: { id: announcement.id },
    });
    expect(result).toEqual(announcement);
  });

  it('should throw a NotFoundException if announcement not found', async () => {
    mockAnnouncementRepository.findOne.mockResolvedValue(null);

    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
  });

  it('should update an existing announcement', async () => {
    const updateAnnouncementDto: UpdateAnnouncementDto = {
      status: AnnouncementStatus.PUBLISHED,
    };
    const announcement = createMockAnnouncement();

    mockAnnouncementRepository.findOne.mockResolvedValue(announcement);
    mockAnnouncementRepository.save.mockResolvedValue({
      ...announcement,
      ...updateAnnouncementDto,
    });

    const result = await service.update(1, updateAnnouncementDto);

    expect(mockAnnouncementRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(mockAnnouncementRepository.save).toHaveBeenCalledWith({
      ...announcement,
      ...updateAnnouncementDto,
    });
    expect(result).toEqual({ ...announcement, ...updateAnnouncementDto });
  });

  it('should remove an existing announcement', async () => {
    const announcement = { id: 1, title: 'Test Announcement' };

    mockAnnouncementRepository.findOne.mockResolvedValue(announcement);
    mockAnnouncementRepository.remove.mockResolvedValue(announcement);

    const result = await service.remove(1);

    expect(mockAnnouncementRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(mockAnnouncementRepository.remove).toHaveBeenCalledWith(
      announcement,
    );
    expect(result).toEqual(announcement);
  });
});
