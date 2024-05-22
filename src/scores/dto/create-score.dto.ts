import { IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { IsRegistered } from 'src/shared/is-registered-constraint';
import { SchoolTerm } from 'src/shared/types';

export class CreateScoreDto {
  @IsEnum(SchoolTerm)
  term: SchoolTerm;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  test: number;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  exam: number;

  @IsRegistered({ tableName: 'students', column: 'id' })
  student_id: number;

  @IsRegistered({ tableName: 'studentclass', column: 'id' })
  class_id: number;

  @IsRegistered({ tableName: 'session', column: 'id' })
  session_id: number;

  @IsRegistered({ tableName: 'subjects', column: 'id' })
  subject_id: number;
}

/**
 * score-meta-data
 * - classid
 * - subjectid
 * - sessionid
 * - term
 * - total students
 * - class_avg
 * - lower_score
 * - highest_score
 */
