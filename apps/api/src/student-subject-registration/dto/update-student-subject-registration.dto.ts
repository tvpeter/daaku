import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentSubjectRegistrationDto } from './create-student-subject-registration.dto';

export class UpdateStudentSubjectRegistrationDto extends PartialType(
  CreateStudentSubjectRegistrationDto,
) {}
