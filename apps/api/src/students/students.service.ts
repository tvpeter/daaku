import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionsService } from '@app/sessions/sessions.service';
import { SessionStatus } from '@app/common/enums';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { StudentCreatedEvent } from './events/student-created.event';
import { StudentsFindQuery } from './dto/students-find-query.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly sessionService: SessionsService,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    await this.checkSessionStatus(createStudentDto.session_id);
    const { session_id, class_id, ...rest } = createStudentDto;
    const newStudent = this.studentRepository.create(rest);

    const result = await this.studentRepository.save(newStudent);

    this.eventEmitter.emit(
      'student.registered',
      new StudentCreatedEvent(result.id, session_id, class_id),
    );

    return result;
  }

  async findAll(query: StudentsFindQuery) {
    const whereClause: any = {};

    if (query.class_id) {
      whereClause.class_id = query.class_id;
    }

    if (query.session_id) {
      whereClause.session_id = query.session_id;
    }

    return await this.studentRepository.find({
      select: {
        id: true,
        name: true,
        gender: true,
        admission_number: true,
        created_at: true,
      },
      where: {
        studentSessionClass: {
          class_id: whereClause.class_id,
          session_id: whereClause.session_id,
        },
      },
      relations: {
        studentSessionClass: {
          studentClass: true,
          session: true,
        },
      },
    });
  }

  async findOne(id: number) {
    const student = await this.studentRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.studentSessionClass', 'ssc')
      .leftJoinAndSelect('ssc.studentClass', 'studentClass')
      .leftJoinAndSelect('ssc.session', 'session')
      .where('student.id = :id', { id })
      .orderBy('ssc.created_at', 'DESC')
      .limit(1)
      .getOne();

    if (!student) throw new NotFoundException('Student not found');

    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student) throw new NotFoundException('Student not found');

    return await this.studentRepository.save({
      ...student,
      ...updateStudentDto,
    });
  }

  async remove(id: number) {
    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student) throw new NotFoundException('Student not found');

    return await this.studentRepository.softRemove(student);
  }

  async checkSessionStatus(id: number): Promise<boolean> {
    const session = await this.sessionService.findOne(id);
    if (session.status === SessionStatus.CLOSED) {
      throw new HttpException(
        `${session.name} is closed. You cannot register a student under a closed session`,
        HttpStatus.PRECONDITION_FAILED,
      );
    }
    return true;
  }

  async getStudentsInAClassBySession(): Promise<Student[]> {
    return await this.studentRepository.find({
      select: {
        id: true,
      },
    });
  }
}
