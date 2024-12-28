import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentSessionClass } from './entities/student-session-class.entity';
import { Repository } from 'typeorm';
import { CreateStudentSessionClassDto } from './dto/create-student-session-class.dto';

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

  async create(createStudentSessionClassDto: CreateStudentSessionClassDto) {
    const { student_id, class_id, session_id } = createStudentSessionClassDto;

    const studentRegistered = await this.checkStudentSessionClassExists(
      student_id,
      session_id,
    );
    if (studentRegistered) {
      throw new ConflictException('Student already registered for the session');
    }
    const studentRecord = this.studentSCRepo.create({
      student_id,
      class_id,
      session_id,
    });
    const newStudentRecord = await this.studentSCRepo.save(studentRecord);
    return newStudentRecord;
  }

  async remove(student_id: number, session_id: number, class_id: number) {
    const studentRecord = await this.studentSCRepo.findOne({
      where: {
        student_id,
        session_id,
        class_id,
      },
    });
    if (studentRecord) {
      await this.studentSCRepo.remove(studentRecord);
      return true;
    } else {
      return false;
    }
  }

  async checkStudentSessionClassExists(
    student_id: number,
    session_id: number,
  ): Promise<boolean> {
    const studentRecord = await this.studentSCRepo.findOne({
      where: {
        student_id,
        session_id,
      },
    });

    if (studentRecord) return true;
    return false;
  }
}
