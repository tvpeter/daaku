export class StudentCreatedEvent {
  public readonly studentId: number;
  public readonly classId: number;
  public readonly sessionId: number;

  constructor(studentId: number, sessionId: number, classId: number) {
    this.studentId = studentId;
    this.classId = classId;
    this.sessionId = sessionId;
  }
}
