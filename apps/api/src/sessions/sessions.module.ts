import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { CommonModule } from '@app/common/common.module';
import { SessionSeederService } from './session.seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Session]), CommonModule],
  controllers: [SessionsController],
  providers: [SessionsService, SessionSeederService],
  exports: [SessionsService, SessionSeederService],
})
export class SessionsModule {}
