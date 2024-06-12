import { Module } from '@nestjs/common';
import { StudentSessionClassService } from './student-session-class.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentSessionClass } from './entities/student-session-class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentSessionClass])],
  providers: [StudentSessionClassService],
  exports: [StudentSessionClassService],
})
export class StudentSessionClassModule {}
