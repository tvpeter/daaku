import { IsRegistered } from '@app/common/validators/is-registered-constraint';
import { IsNumber } from 'class-validator';

export class CreateStudentSubjectRegistrationDto {
  @IsRegistered({ tableName: 'students', column: 'id' })
  @IsNumber()
  student_id: number;

  @IsRegistered({ tableName: 'student_class', column: 'id' })
  @IsNumber()
  class_id: number;

  @IsRegistered({ tableName: 'session', column: 'id' })
  @IsNumber()
  session_id: number;

  @IsRegistered({ tableName: 'subjects', column: 'id' })
  @IsNumber()
  subject_id: number;
}
