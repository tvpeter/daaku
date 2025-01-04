import { IsRegistered } from '@app/common/validators/is-registered-constraint';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class StudentSubjectsDto {
  @Type(() => Number)
  @IsNumber()
  @IsRegistered({ tableName: 'students', column: 'id' })
  student_id?: number;

  @Type(() => Number)
  @IsNumber()
  @IsRegistered({ tableName: 'student_class', column: 'id' })
  class_id?: number;

  @Type(() => Number)
  @IsNumber()
  @IsRegistered({ tableName: 'session', column: 'id' })
  session_id?: number;

  @Type(() => Number)
  @IsNumber()
  @IsRegistered({ tableName: 'subjects', column: 'id' })
  subject_id?: number;
}
