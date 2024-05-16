import { IsString, MinLength } from 'class-validator';
import { IsUnique } from 'src/shared/isUniqueConstraint';

export class CreateStudentclassDto {
  @IsString()
  @MinLength(3)
  @IsUnique({ tableName: 'studentclass', column: 'name' })
  name: string;
}
