import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { StudentSubjectRegistrationService } from './student-subject-registration.service';
import { CreateStudentSubjectRegistrationDto } from './dto/create-student-subject-registration.dto';
import { UpdateStudentSubjectRegistrationDto } from './dto/update-student-subject-registration.dto';
import { FindStudentSubjectRegQueryDto } from './dto/find-student-subject-reg-query.dto';

@Controller('student-subjects')
export class StudentSubjectRegistrationController {
  constructor(
    private readonly studentSubjectRegistrationService: StudentSubjectRegistrationService,
  ) {}

  @Post()
  create(
    @Body()
    createStudentSubjectRegistrationDto: CreateStudentSubjectRegistrationDto,
  ) {
    return this.studentSubjectRegistrationService.create(
      createStudentSubjectRegistrationDto,
    );
  }

  @Get()
  findAll(@Query() query: FindStudentSubjectRegQueryDto) {
    return this.studentSubjectRegistrationService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentSubjectRegistrationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateStudentSubjectRegistrationDto: UpdateStudentSubjectRegistrationDto,
  ) {
    return this.studentSubjectRegistrationService.update(
      id,
      updateStudentSubjectRegistrationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.studentSubjectRegistrationService.remove(id);
  }
}
