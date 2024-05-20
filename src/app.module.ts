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
import { IsUniqueConstraint } from './shared/is-unique-constraint';
import { IsRegisteredConstraint } from './shared/is-registered-constraint';
import { ResultStatusModule } from './result-status/result-status.module';

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
  ],
  controllers: [],
  providers: [IsUniqueConstraint, IsRegisteredConstraint],
})
export class AppModule {}
