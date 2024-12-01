import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { UsersModule } from '@app/users/users.module';
import { StudentsModule } from '@app/students/students.module';
import { StudentclassModule } from '@app/studentclass/studentclass.module';
import { SessionsModule } from '@app/sessions/sessions.module';
import { SubjectsModule } from '@app/subjects/subjects.module';
import { StudentSessionClassModule } from '@app/student-session-class/student-session-class.module';

@Module({
  providers: [SeederService],
  imports: [
    UsersModule,
    StudentsModule,
    SessionsModule,
    StudentclassModule,
    SubjectsModule,
    StudentSessionClassModule,
  ],
})
export class SeederModule {}
