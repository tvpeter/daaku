import { SessionStatus } from '@app/common/enums';
import { IsUnique } from '@app/common/validators/is-unique-constraint';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateSessionDto {
  @IsString()
  @IsNotEmpty()
  @IsUnique({ tableName: 'session', column: 'name' })
  @MinLength(9)
  @MaxLength(9)
  name: string;

  @IsEnum(SessionStatus)
  @IsOptional()
  status: SessionStatus;
}
