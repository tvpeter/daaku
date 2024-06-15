import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Announcement } from './entities/announcement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectRepository(Announcement)
    private readonly announcementRepo: Repository<Announcement>,
  ) {}

  async create(createAnnouncementDto: CreateAnnouncementDto) {
    const announcement = this.announcementRepo.create(createAnnouncementDto);

    return await this.announcementRepo.save(announcement);
  }

  async findAll() {
    return await this.announcementRepo.find();
  }

  async findOne(id: number) {
    const announcement = await this.announcementRepo.findOne({ where: { id } });

    if (!announcement) throw new NotFoundException('Announcement not found');

    return announcement;
  }

  async update(id: number, updateAnnouncementDto: UpdateAnnouncementDto) {
    const announcement = await this.findOne(id);

    return await this.announcementRepo.save({
      ...announcement,
      ...updateAnnouncementDto,
    });
  }

  async remove(id: number) {
    const announcement = await this.findOne(id);

    return await this.announcementRepo.remove(announcement);
  }
}
