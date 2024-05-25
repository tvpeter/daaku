import { IsRegistered } from '@app/shared/is-registered-constraint';
import { SchoolTerm } from '@app/shared/types';
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
