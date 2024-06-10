import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentSessionClass } from './entities/student-session-class.entity';
import { Repository } from 'typeorm';
import { OnEvent } from '@nestjs/event-emitter';
import { StudentCreatedEvent } from '@app/students/events/student-created.event';

@Injectable()
export class StudentSessionClassService {
  private readonly logger = new Logger(StudentSessionClassService.name);

  constructor(
    @InjectRepository(StudentSessionClass)
    private readonly studentSCRepo: Repository<StudentSessionClass>,
  ) {}

  async findAll(
    sessionId: number,
    classId: number,
  ): Promise<StudentSessionClass[] | []> {
    const students = await this.studentSCRepo.find({
      where: {
        session_id: sessionId,
        class_id: classId,
      },
    });
    return students;
  }

  async findOne(
    studentId: number,
    sessionId: number,
    classId: number,
  ): Promise<StudentSessionClass | null> {
    const studentSesionClass = await this.studentSCRepo.findOne({
      where: {
        student_id: studentId,
        session_id: sessionId,
        class_id: classId,
      },
    });
    return studentSesionClass;
  }

  remove(id: number) {
    return `This action removes a #${id} studentSessionClass`;
  }

  @OnEvent('student.registered')
  async handleStudentRegisteredEvent(
    payload: StudentCreatedEvent,
  ): Promise<StudentSessionClass | null> {
    try {
      const studentRecord = this.studentSCRepo.create({
        student_id: payload.studentId,
        class_id: payload.classId,
        session_id: payload.studentId,
      });
      const newStudentRecord = await this.studentSCRepo.save(studentRecord);
      this.logger.log(
        `Student with ID ${payload.studentId} has been registered in the student-session-class`,
      );
      return newStudentRecord;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
