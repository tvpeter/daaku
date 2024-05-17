import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { IsUnique } from 'src/shared/isUniqueConstraint';
import { SessionStatus } from 'src/types/types';

export class CreateSessionDto {
  @IsString()
  @IsNotEmpty()
  @IsUnique({ tableName: 'session', column: 'name' })
  name: string;

  @IsEnum(SessionStatus)
  status: SessionStatus;
}
