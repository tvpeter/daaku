import { forwardRef, Module } from '@nestjs/common';
import { StudentclassService } from './studentclass.service';
import { StudentclassController } from './studentclass.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Studentclass } from './entities/studentclass.entity';
import { StudentsModule } from 'src/students/students.module';
import { CommonModule } from '@app/common/common.module';
import { StudentClassSeederService } from './studentclass.seeder.service';
import { UsersModule } from '@app/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Studentclass]),
    forwardRef(() => StudentsModule),
    CommonModule,
    UsersModule,
  ],
  controllers: [StudentclassController],
  providers: [StudentclassService, StudentClassSeederService],
  exports: [StudentClassSeederService],
})
export class StudentclassModule {}
