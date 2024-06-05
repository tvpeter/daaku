import { IsUnique } from '@app/common/validators/is-unique-constraint';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateStudentclassDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @IsUnique({ tableName: 'student_class', column: 'name' })
  name: string;
}
