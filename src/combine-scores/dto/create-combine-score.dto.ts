import { IsRegistered } from '@app/shared/is-registered-constraint';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateCombineScoreDto {
  @IsRegistered({ tableName: 'students', column: 'id' })
  student_id: number;

  @IsRegistered({ tableName: 'student_class', column: 'id' })
  class_id: number;

  @IsRegistered({ tableName: 'session', column: 'id' })
  session_id: number;

  @IsRegistered({ tableName: 'subjects', column: 'id' })
  subjeect_id: number;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  term_1: number;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  term_2: number;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  term_3: number;
}
