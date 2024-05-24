import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { Studentclass } from '@app/studentclass/entities/studentclass.entity';
import { Student } from '@app/students/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Result, Studentclass, Student])],
  controllers: [ResultsController],
  providers: [ResultsService],
  exports: [TypeOrmModule.forFeature([Result])],
})
export class ResultsModule {}
