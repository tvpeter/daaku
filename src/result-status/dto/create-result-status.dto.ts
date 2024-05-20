import { IsEnum } from 'class-validator';
import { Session } from 'src/sessions/entities/session.entity';
import { IsRegistered } from 'src/shared/is-registered-constraint';
import { ResultStatusEnum, SchoolTerm } from 'src/shared/types';
import { Studentclass } from 'src/studentclass/entities/studentclass.entity';

export class CreateResultStatusDto {
  @IsEnum(SchoolTerm)
  term: SchoolTerm;

  @IsEnum(ResultStatusEnum)
  result_status: ResultStatusEnum;

  @IsRegistered({ tableName: 'session', column: 'id' })
  session: Session;

  @IsRegistered({ tableName: 'studentclass', column: 'id' })
  class: Studentclass;
}
