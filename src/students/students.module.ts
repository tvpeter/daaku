import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { SessionsModule } from '@app/sessions/sessions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Student]), SessionsModule],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
