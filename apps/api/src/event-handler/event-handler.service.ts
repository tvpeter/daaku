import { CombineScoresService } from '@app/combine-scores/combine-scores.service';
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
    private readonly combineScoreService: CombineScoresService,
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
      this.combineScoreStudentClassSubjectReg(studentsData);
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
      await this.studentSessionClassService.create({
        student_id: studentId,
        class_id: classId,
        session_id: sessionId,
      });

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

  private async combineScoreStudentClassSubjectReg(
    studentsData: RegisterStudentSubject[],
  ) {
    try {
      const uniqueStudentData = studentsData.filter(async (student) => {
        const checkStudentAndSubject =
          await this.combineScoreService.checkStudentDataExist(
            student.student_id,
            student.class_id,
            student.session_id,
            student.subject_id,
          );
        if (!checkStudentAndSubject) return student;
      });

      await this.combineScoreService.registerStudents(uniqueStudentData);

      this.logger.log(
        'Registered given subject for all students in the given class for their combine results',
      );
    } catch (error) {
      this.logger.error(
        `Error handling register-class subject event for combine scores: ${error.message}`,
        error.stack,
      );
      throw new UnprocessableEntityException(error);
    }
  }
}
