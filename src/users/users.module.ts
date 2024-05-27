import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Announcement } from '@app/announcements/entities/announcement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Announcement])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
