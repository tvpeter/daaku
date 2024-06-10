import { Module } from '@nestjs/common';
import { StudentSessionClassService } from './student-session-class.service';
import { StudentSessionClassController } from './student-session-class.controller';

@Module({
  controllers: [StudentSessionClassController],
  providers: [StudentSessionClassService],
})
export class StudentSessionClassModule {}
