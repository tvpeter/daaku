import { SchoolTerm } from '@app/common/enums';
import { IsRegistered } from '@app/common/validators/is-registered-constraint';
import { IsEnum, IsNumber } from 'class-validator';

export class CreateResultDto {
  @IsEnum(SchoolTerm)
  term: SchoolTerm;

  @IsNumber()
  subject_total: number;

  @IsNumber()
  student_score: number;

  @IsRegistered({ tableName: 'students', column: 'id' })
  student_id: number;

  @IsRegistered({ column: 'id', tableName: 'student_class' })
  class_id: number;

  @IsRegistered({ tableName: 'session', column: 'id' })
  session_id: number;
}
