import { Module } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { AnnouncementsController } from './announcements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/users/entities/user.entity';
import { Announcement } from './entities/announcement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Announcement, User])],
  controllers: [AnnouncementsController],
  providers: [AnnouncementsService],
  exports: [TypeOrmModule.forFeature([Announcement])],
})
export class AnnouncementsModule {}
