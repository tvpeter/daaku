import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IsUnique } from '@app/common/is-unique-constraint';

export class CreateStudentclassDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @IsUnique({ tableName: 'student_class', column: 'name' })
  name: string;
}
