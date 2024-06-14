import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentclassDto } from './create-studentclass.dto';

export class UpdateStudentclassDto extends PartialType(CreateStudentclassDto) {}
