import { PartialType } from '@nestjs/mapped-types';
import { CreateSessionClassTeacherDto } from './create-session-class-teacher.dto';

export class UpdateSessionClassTeacherDto extends PartialType(
  CreateSessionClassTeacherDto,
) {}
