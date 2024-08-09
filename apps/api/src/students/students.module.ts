import { forwardRef, Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { SessionsModule } from '@app/sessions/sessions.module';
import { CommonModule } from '@app/common/common.module';
import { StudentSeederService } from './student.seeder.service';
import { StudentclassModule } from '@app/studentclass/studentclass.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    SessionsModule,
    CommonModule,
    forwardRef(() => StudentclassModule),
  ],
  controllers: [StudentsController],
  providers: [StudentsService, StudentSeederService],
  exports: [StudentsService, StudentSeederService],
})
export class StudentsModule {}
