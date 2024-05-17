import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { IsUnique } from 'src/shared/isUniqueConstraint';

export class CreateSessionDto {
  @IsString()
  @IsNotEmpty()
  @IsUnique({ tableName: 'session', column: 'name' })
  @MinLength(9)
  @MaxLength(9)
  name: string;
}
