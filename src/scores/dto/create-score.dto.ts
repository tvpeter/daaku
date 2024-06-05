import { SchoolTerm } from '@app/common/enums';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  Max,
  Min,
} from 'class-validator';
import { IsRegistered } from '@app/common/is-registered-constraint';

export class CreateScoreDto {
  @IsEnum(SchoolTerm)
  term: SchoolTerm;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Min(0)
  @Max(30)
  test: number;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Min(0)
  @Max(70)
  exam: number;

  @IsRegistered({ tableName: 'students', column: 'id' })
  student_id: number;

  @IsRegistered({ tableName: 'student_class', column: 'id' })
  class_id: number;

  @IsRegistered({ tableName: 'session', column: 'id' })
  session_id: number;

  @IsRegistered({ tableName: 'subjects', column: 'id' })
  subject_id: number;
}
