import { Gender } from '@app/common/enums';
import { IsUnique } from '@app/common/validators/is-unique-constraint';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsUnique({ tableName: 'students', column: 'admission_number' })
  admission_number: string;

  @IsString()
  dob: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  address: string;

  @IsUnique({ tableName: 'students', column: 'phone' })
  phone: string;

  @IsEmail()
  @IsUnique({ tableName: 'students', column: 'email' })
  email: string;

  @IsString()
  passport_url: string;
}
