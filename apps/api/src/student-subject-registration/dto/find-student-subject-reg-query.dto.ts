import { IsRegistered } from '@app/common/validators/is-registered-constraint';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class FindStudentSubjectRegQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsRegistered({ tableName: 'student_class', column: 'id' })
  class_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsRegistered({ tableName: 'session', column: 'id' })
  session_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsRegistered({ tableName: 'subjects', column: 'id' })
  subject_id?: number;
}
