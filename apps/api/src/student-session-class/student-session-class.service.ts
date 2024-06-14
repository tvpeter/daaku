import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentSessionClass } from './entities/student-session-class.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentSessionClassService {
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

  async create(student_id: number, class_id: number, session_id: number) {
    const studentRecord = this.studentSCRepo.create({
      student_id,
      class_id,
      session_id,
    });
    const newStudentRecord = await this.studentSCRepo.save(studentRecord);
    return newStudentRecord;
  }
}
