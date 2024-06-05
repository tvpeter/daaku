import { IsString } from 'class-validator';
import { IsUnique } from '@app/common/is-unique-constraint';

export class CreateSubjectDto {
  @IsString()
  @IsUnique({ tableName: 'subjects', column: 'name' })
  name: string;
}
