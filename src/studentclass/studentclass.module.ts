import { Module } from '@nestjs/common';
import { StudentclassService } from './studentclass.service';
import { StudentclassController } from './studentclass.controller';

@Module({
  controllers: [StudentclassController],
  providers: [StudentclassService],
})
export class StudentclassModule {}
