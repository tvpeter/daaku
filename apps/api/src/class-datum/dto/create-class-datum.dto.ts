import { IsRegistered } from '@app/common/validators/is-registered-constraint';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateClassDatumDto {
  @IsRegistered({ tableName: 'student_class', column: 'id' })
  @IsNumber()
  class_id: number;

  @IsRegistered({ tableName: 'session', column: 'id' })
  @IsNumber()
  session_id: number;

  @IsNumber()
  @IsOptional()
  total_subjects: number;

  @IsRegistered({ tableName: 'users', column: 'id' })
  @IsNumber()
  @IsOptional()
  teacher_id: number;

  @IsNumber()
  @IsOptional()
  total_students: number;
}
