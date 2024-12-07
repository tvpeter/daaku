import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { StudentSubjectRegistrationService } from './student-subject-registration.service';
import { CreateStudentSubjectRegistrationDto } from './dto/create-student-subject-registration.dto';
import { UpdateStudentSubjectRegistrationDto } from './dto/update-student-subject-registration.dto';

@Controller('student-subject-registration')
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
  findAll() {
    return this.studentSubjectRegistrationService.findAll();
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
