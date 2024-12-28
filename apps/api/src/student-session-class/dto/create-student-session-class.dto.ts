import { IsRegistered } from '@app/common/validators/is-registered-constraint';
import { IsNumber } from 'class-validator';

export class CreateStudentSessionClassDto {
  @IsRegistered({ tableName: 'students', column: 'id' })
  @IsNumber()
  student_id: number;

  @IsRegistered({ tableName: 'students', column: 'id' })
  @IsNumber()
  class_id: number;

  @IsRegistered({ tableName: 'students', column: 'id' })
  @IsNumber()
  session_id: number;
}
