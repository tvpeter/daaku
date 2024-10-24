import { UserRole } from '@app/common/enums';
import { IsUnique } from '@app/common/validators/is-unique-constraint';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 20)
  @IsNotEmpty()
  @IsUnique({ tableName: 'users', column: 'username' })
  username: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  sig_url: string;

  @IsOptional()
  @IsString()
  @Length(11, 11)
  @IsUnique({ tableName: 'users', column: 'phone' })
  phone: string;

  @IsEmail()
  @IsUnique({ tableName: 'users', column: 'email' })
  email: string;

  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  @IsString()
  token: string;
}
