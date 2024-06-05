import { IsUnique } from '@app/common/validators/is-unique-constraint';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  @IsNotEmpty()
  @IsUnique({ tableName: 'session', column: 'name' })
  @MinLength(9)
  @MaxLength(9)
  name: string;
}
