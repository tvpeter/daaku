import { IsRegistered } from '@app/common/validators/is-registered-constraint';
import { IsNumber } from 'class-validator';

export class CreateSessionClassTeacherDto {
  @IsRegistered({ tableName: 'session', column: 'id' })
  @IsNumber()
  session_id: number;

  @IsRegistered({ tableName: 'student_class', column: 'id' })
  @IsNumber()
  class_id: number;

  @IsRegistered({ tableName: 'users', column: 'id' })
  @IsNumber()
  user_id: number;
}
