export class StudentCreatedEvent {
  public readonly studentId: number;
  public readonly classId: number;
  public readonly sessionId: number;

  constructor(studentId, classId, sessionId) {
    this.studentId = studentId;
    this.classId = classId;
    this.sessionId = sessionId;
  }
}
