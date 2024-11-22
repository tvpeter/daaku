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

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly sessionService: SessionsService,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    await this.checkSessionStatus(createStudentDto.current_session_id);
    const newStudent = this.studentRepository.create(createStudentDto);

    const result = await this.studentRepository.save(newStudent);

    this.eventEmitter.emit(
      'student.registered',
      new StudentCreatedEvent(
        result.id,
        result.current_class_id,
        result.current_session_id,
      ),
    );

    return result;
  }

  async findAll(session_id?: number, class_id?: number) {
    return await this.studentRepository.find({
      select: {
        id: true,
        name: true,
        gender: true,
        admission_number: true,
        current_class_id: true,
        class: {
          name: true,
        },
        current_session_id: true,
        session: {
          name: true,
        },
        created_at: true,
      },
      relations: {
        class: true,
        session: true,
      },
      where: {
        current_session_id: session_id,
        current_class_id: class_id,
      },
      order: {
        current_class_id: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    const student = await this.studentRepository.findOne({
      where: { id },
    });
    if (!student) throw new NotFoundException('Student not found');

    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const student = await this.findOne(id);
    return await this.studentRepository.save({
      ...student,
      ...updateStudentDto,
    });
  }

  async remove(id: number) {
    const student = await this.findOne(id);

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

  async getStudentsInAClassBySession(
    session_id: number,
    class_id: number,
  ): Promise<Student[]> {
    return await this.studentRepository.find({
      select: {
        id: true,
      },
      where: {
        current_session_id: session_id,
        current_class_id: class_id,
      },
    });
  }
}
