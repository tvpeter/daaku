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
    const newStudent = this.studentRepository.create(createStudentDto);
    await this.checkSessionStatus(newStudent.session_id);

    const result = await this.studentRepository.save(newStudent);

    this.eventEmitter.emit(
      'student.registered',
      new StudentCreatedEvent(result.id, result.class_id, result.session_id),
    );

    return result;
  }

  async findAll() {
    return await this.studentRepository.find();
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

    return await this.studentRepository.remove(student);
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
}
