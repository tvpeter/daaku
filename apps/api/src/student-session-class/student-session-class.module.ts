import { Module } from '@nestjs/common';
import { StudentSessionClassService } from './student-session-class.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentSessionClass } from './entities/student-session-class.entity';
import { StudentsModule } from '@app/students/students.module';
import { SessionsModule } from '@app/sessions/sessions.module';
import { StudentclassModule } from '@app/studentclass/studentclass.module';
import { StudentSessionClassSeeder } from './student-session-class-seeder';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentSessionClass]),
    StudentsModule,
    SessionsModule,
    StudentclassModule,
  ],
  providers: [StudentSessionClassService, StudentSessionClassSeeder],
  exports: [StudentSessionClassService, StudentSessionClassSeeder],
})
export class StudentSessionClassModule {}
