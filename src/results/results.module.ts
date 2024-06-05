import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { Studentclass } from '@app/studentclass/entities/studentclass.entity';
import { Student } from '@app/students/entities/student.entity';
import { CommonModule } from '@app/common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Result, Studentclass, Student]),
    CommonModule,
  ],
  controllers: [ResultsController],
  providers: [ResultsService],
  exports: [TypeOrmModule.forFeature([Result])],
})
export class ResultsModule {}
