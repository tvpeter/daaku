import { IsUnique } from '@app/common/validators/is-unique-constraint';
import { IsString } from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  @IsUnique({ tableName: 'subjects', column: 'name' })
  name: string;
}
