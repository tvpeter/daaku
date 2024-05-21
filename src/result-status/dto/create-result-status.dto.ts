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
  sessionId: number;

  @IsRegistered({ tableName: 'studentclass', column: 'id' })
  classId: number;
}
