import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { CommonModule } from '@app/common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([Session]), CommonModule],
  controllers: [SessionsController],
  providers: [
    SessionsService,
    {
      provide: getRepositoryToken(Session),
      useValue: 'mockRepository',
    },
  ],
  exports: [SessionsService, TypeOrmModule.forFeature([Session])],
})
export class SessionsModule {}
