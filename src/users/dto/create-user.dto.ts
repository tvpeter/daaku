import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { Role } from 'src/shared/types';

export class CreateUserDto {
  @IsString()
  @Length(3, 20)
  @IsNotEmpty()
  username: string;

  @IsString()
  name: string;

  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsString()
  sig_url: string;

  @IsOptional()
  @IsString()
  @Length(11, 11)
  phone: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsEnum(Role)
  role: Role;
}
