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
import { IsUniqueConstraint } from './shared/isUniqueConstraint';

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
  ],
  controllers: [],
  providers: [IsUniqueConstraint],
})
export class AppModule {}
