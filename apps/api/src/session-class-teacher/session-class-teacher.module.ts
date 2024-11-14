import { Module } from '@nestjs/common';
import { SessionClassTeacherService } from './session-class-teacher.service';
import { SessionClassTeacherController } from './session-class-teacher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionClassTeacher } from './entities/session-class-teacher.entity';
import { CommonModule } from '@app/common/common.module';
import { SessionsModule } from '@app/sessions/sessions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SessionClassTeacher]),
    SessionsModule,
    CommonModule,
  ],
  controllers: [SessionClassTeacherController],
  providers: [SessionClassTeacherService],
})
export class SessionClassTeacherModule {}
