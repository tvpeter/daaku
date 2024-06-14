import { SchoolTerm, ResultStatusEnum } from '@app/common/enums';
import { IsRegistered } from '@app/common/validators/is-registered-constraint';
import { IsEnum, IsNumber } from 'class-validator';

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
