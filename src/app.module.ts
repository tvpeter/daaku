import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StudentsModule } from './students/students.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
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
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
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
