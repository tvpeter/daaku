import { IsEnum, IsNumber } from 'class-validator';
import { IsRegistered } from 'src/shared/is-registered-constraint';
import { ResultStatusEnum, SchoolTerm } from 'src/shared/types';

export class CreateResultStatusDto {
  @IsEnum(SchoolTerm)
  term: SchoolTerm;

  @IsEnum(ResultStatusEnum)
  result_status: ResultStatusEnum;

  @IsNumber()
  @IsRegistered({ tableName: 'session', column: 'id' })
  session_id: number;

  @IsRegistered({ tableName: 'student_class', column: 'id' })
  class_id: number;
}
