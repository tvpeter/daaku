import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentsModule]), Repository<Student>],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
