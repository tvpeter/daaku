import { Module } from '@nestjs/common';
import { StudentSubjectRegistrationService } from './student-subject-registration.service';
import { StudentSubjectRegistrationController } from './student-subject-registration.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentSubjectRegistration } from './entities/student-subject-registration.entity';
import { StudentSessionClassModule } from '@app/student-session-class/student-session-class.module';
import { StudentSubjectRegistrationSeeder } from './student-subject-registration-seeder';
import { SubjectsModule } from '@app/subjects/subjects.module';
import { SessionsModule } from '@app/sessions/sessions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentSubjectRegistration]),
    StudentSessionClassModule,
    SubjectsModule,
    SessionsModule,
  ],
  controllers: [StudentSubjectRegistrationController],
  providers: [
    StudentSubjectRegistrationService,
    StudentSubjectRegistrationSeeder,
  ],
  exports: [
    StudentSubjectRegistrationService,
    StudentSubjectRegistrationSeeder,
  ],
})
export class StudentSubjectRegistrationModule {}
