export class StudentCreatedEvent {
  public readonly studentId: number;
  public readonly classId: number;
  public readonly sessionId: number;

  constructor(studentId: number, classId: number, sessionId: number) {
    this.studentId = studentId;
    this.classId = classId;
    this.sessionId = sessionId;
  }
}
