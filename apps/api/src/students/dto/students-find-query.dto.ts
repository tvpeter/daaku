import { IsRegistered } from '@app/common/validators/is-registered-constraint';
import { Type } from 'class-transformer';
import { IsOptional, IsNumber } from 'class-validator';

export class StudentsFindQuery {
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
}
