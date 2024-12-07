import { Module } from '@nestjs/common';
import { StudentSubjectRegistrationService } from './student-subject-registration.service';
import { StudentSubjectRegistrationController } from './student-subject-registration.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentSubjectRegistration } from './entities/student-subject-registration.entity';
import { SessionsModule } from '@app/sessions/sessions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentSubjectRegistration]),
    SessionsModule,
  ],
  controllers: [StudentSubjectRegistrationController],
  providers: [StudentSubjectRegistrationService],
})
export class StudentSubjectRegistrationModule {}
