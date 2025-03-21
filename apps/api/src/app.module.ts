import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StudentsModule } from './students/students.module';
import { UsersModule } from './users/users.module';
import { StudentclassModule } from './studentclass/studentclass.module';
import { SubjectsModule } from './subjects/subjects.module';
import { SessionsModule } from './sessions/sessions.module';
import { AccountsModule } from './accounts/accounts.module';
import { ResultStatusModule } from './result-status/result-status.module';
import { ScoresModule } from './scores/scores.module';
import { ScoreMetaDataModule } from './score-meta-data/score-meta-data.module';
import { ResultsModule } from './results/results.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { CombineResultsModule } from './combine-results/combine-results.module';
import { CombineScoresModule } from './combine-scores/combine-scores.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { CommonModule } from './common/common.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { StudentSessionClassModule } from './student-session-class/student-session-class.module';
import { EventHandlerModule } from './event-handler/event-handler.module';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { DbModule } from './db/db.module';
import { SeederModule } from './seeder/seeder.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { SessionClassTeacherModule } from './session-class-teacher/session-class-teacher.module';
import { StudentSubjectRegistrationModule } from './student-subject-registration/student-subject-registration.module';
import { ClassDatumModule } from './class-datum/class-datum.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    StudentsModule,
    UsersModule,
    StudentclassModule,
    SubjectsModule,
    SessionsModule,
    AccountsModule,
    ResultStatusModule,
    ScoresModule,
    ScoreMetaDataModule,
    ResultsModule,
    AnnouncementsModule,
    CombineResultsModule,
    CombineScoresModule,
    AuthModule,
    CommonModule,
    EventEmitterModule.forRoot({
      wildcard: false,
      delimiter: '.',
      newListener: false,
      removeListener: false,
      maxListeners: 10,
      verboseMemoryLeak: false,
      ignoreErrors: false,
    }),
    StudentSessionClassModule,
    EventHandlerModule,
    HealthcheckModule,
    DbModule,
    SeederModule,
    SessionClassTeacherModule,
    StudentSubjectRegistrationModule,
    ClassDatumModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
