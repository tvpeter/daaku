import { Module } from '@nestjs/common';
import { StudentclassService } from './studentclass.service';
import { StudentclassController } from './studentclass.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Studentclass } from './entities/studentclass.entity';
import { StudentsModule } from 'src/students/students.module';

@Module({
  imports: [TypeOrmModule.forFeature([Studentclass]), StudentsModule],
  controllers: [StudentclassController],
  providers: [StudentclassService],
})
export class StudentclassModule {}
