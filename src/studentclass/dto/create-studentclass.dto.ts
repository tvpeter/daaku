import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IsUnique } from 'src/shared/is-unique-constraint';

export class CreateStudentclassDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @IsUnique({ tableName: 'student_class', column: 'name' })
  name: string;
}
