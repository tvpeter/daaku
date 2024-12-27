import { Body, Controller, Post } from '@nestjs/common';
import { StudentSessionClassService } from './student-session-class.service';
import { CreateStudentSessionClassDto } from './dto/create-student-session-class.dto';

@Controller('student-session-class')
export class StudentSessionClassController {
  constructor(
    private readonly studentSessionClassService: StudentSessionClassService,
  ) {}

  @Post()
  create(@Body() createStudentSessionClassDto: CreateStudentSessionClassDto) {
    return this.studentSessionClassService.create(createStudentSessionClassDto);
  }
}
