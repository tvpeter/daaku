import { IsRegistered } from '@app/common/validators/is-registered-constraint';

export class RegisterSubjectDTO {
  @IsRegistered({ tableName: 'student_class', column: 'id' })
  class_id: number;

  @IsRegistered({ tableName: 'session', column: 'id' })
  session_id: number;

  @IsRegistered({ tableName: 'subjects', column: 'id' })
  subject_id: number;
}
