import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from '@app/common/common.module';
import { UsersSeederService } from './users.seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule, CommonModule],
  controllers: [UsersController],
  providers: [UsersService, UsersSeederService],
  exports: [UsersService, UsersSeederService],
})
export class UsersModule {}
