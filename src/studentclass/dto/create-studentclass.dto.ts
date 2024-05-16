import { IsString, MinLength, Validate } from 'class-validator';
import { StudentClassValidator } from './studentclass.validator';

export class CreateStudentclassDto {
  @IsString()
  @MinLength(3)
  @Validate(StudentClassValidator)
  name: string;
}
