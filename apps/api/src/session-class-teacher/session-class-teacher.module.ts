import { Module } from '@nestjs/common';
import { SessionClassTeacherService } from './session-class-teacher.service';
import { SessionClassTeacherController } from './session-class-teacher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionClassTeacher } from './entities/session-class-teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SessionClassTeacher])],
  controllers: [SessionClassTeacherController],
  providers: [SessionClassTeacherService],
})
export class SessionClassTeacherModule {}
