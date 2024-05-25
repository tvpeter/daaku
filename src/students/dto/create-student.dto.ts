import { IsUnique } from 'src/shared/is-unique-constraint';
import { Gender } from '../../shared/types';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { IsRegistered } from 'src/shared/is-registered-constraint';

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

  @IsRegistered({ tableName: 'student_class', column: 'id' })
  class_id: number;

  @IsRegistered({ tableName: 'session', column: 'id' })
  session_id: number;
}
