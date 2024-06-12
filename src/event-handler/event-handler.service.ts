import { RegisterStudentSubject } from '@app/scores/events/register-student-subject.interface';
import { ScoresService } from '@app/scores/scores.service';
import { StudentSessionClassService } from '@app/student-session-class/student-session-class.service';
import { StudentCreatedEvent } from '@app/students/events/student-created.event';
import {
  Injectable,
  Logger,
  PreconditionFailedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class EventHandlerService {
  private readonly logger = new Logger(EventHandlerService.name);

  constructor(
    private readonly scoresService: ScoresService,
    private readonly studentSessionClassService: StudentSessionClassService,
  ) {}

  @OnEvent('register-class.subject')
  async handleStudentClassSubjectRegistration(
    studentsData: RegisterStudentSubject[],
  ) {
    try {
      const uniqueStudentData = studentsData.filter(async (student) => {
        const checkStudentDataStatus =
          await this.scoresService.checkStudentDataExist(
            student.student_id,
            student.class_id,
            student.session_id,
            student.subject_id,
          );

        if (!checkStudentDataStatus) return student;
      });

      await this.scoresService.registerStudents(uniqueStudentData);

      this.logger.log(`Registered a subject for students in the given class`);
    } catch (error) {
      this.logger.error(
        `Error handling register-class subject event: ${error.message}`,
        error.stack,
      );
      throw new UnprocessableEntityException(error);
    }
  }

  @OnEvent('student.registered')
  async handleStudentRegisteredEvent(payload: StudentCreatedEvent) {
    try {
      const { studentId, classId, sessionId } = payload;

      const checkStudentSessionClass =
        await this.studentSessionClassService.findOne(
          studentId,
          sessionId,
          classId,
        );

      if (checkStudentSessionClass) {
        this.logger.error(
          `Registered student records already exist in student-class-session`,
        );
        throw new PreconditionFailedException();
      }
      await this.studentSessionClassService.create(
        studentId,
        classId,
        sessionId,
      );

      this.logger.log(
        `Student with ID ${payload.studentId} has been registered in the student-session-class`,
      );
    } catch (error) {
      this.logger.error(
        `Error handling register-class subject event: ${error.message}`,
        error.stack,
      );
      throw new UnprocessableEntityException(error);
    }
  }
}
