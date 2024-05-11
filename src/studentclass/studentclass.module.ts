import { Module } from '@nestjs/common';
import { StudentclassService } from './studentclass.service';
import { StudentclassController } from './studentclass.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Studentclass } from './entities/studentclass.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Studentclass])],
  controllers: [StudentclassController],
  providers: [StudentclassService],
})
export class StudentclassModule {}
