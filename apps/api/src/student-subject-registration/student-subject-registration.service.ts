import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentSubjectRegistrationDto } from './dto/create-student-subject-registration.dto';
import { UpdateStudentSubjectRegistrationDto } from './dto/update-student-subject-registration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentSubjectRegistration } from './entities/student-subject-registration.entity';
import { Repository } from 'typeorm';
import { SessionsService } from '@app/sessions/sessions.service';

@Injectable()
export class StudentSubjectRegistrationService {
  constructor(
    @InjectRepository(StudentSubjectRegistration)
    private readonly studentSubjectRegRepository: Repository<StudentSubjectRegistration>,
    private readonly sessionService: SessionsService,
  ) {}
  async create(createSubjectRegDTO: CreateStudentSubjectRegistrationDto) {
    const isSubjectRegistered =
      await this.checkRegistrationExists(createSubjectRegDTO);

    if (isSubjectRegistered)
      throw new ConflictException(
        'Student already registerd for the subject for the session',
      );

    const isSessionOpen = await this.sessionService.checkSessionIsOpen(
      createSubjectRegDTO.session_id,
    );

    if (!isSessionOpen)
      throw new BadRequestException('Selected session is closed');

    const newStudentSubject =
      this.studentSubjectRegRepository.create(createSubjectRegDTO);

    return await this.studentSubjectRegRepository.save(newStudentSubject);
  }

  async findAll() {
    return await this.studentSubjectRegRepository.find();
  }

  async findOne(id: number) {
    const studentSubject = await this.studentSubjectRegRepository.findOne({
      where: { id },
    });

    if (!studentSubject) throw new NotFoundException();

    return studentSubject;
  }

  async update(
    id: number,
    updateStudentSubjectRegDTO: UpdateStudentSubjectRegistrationDto,
  ) {
    const studentSubject = await this.findOne(id);

    return await this.studentSubjectRegRepository.save({
      ...studentSubject,
      ...updateStudentSubjectRegDTO,
    });
  }

  async remove(id: number) {
    const studentSubject = await this.findOne(id);

    return await this.studentSubjectRegRepository.softRemove(studentSubject);
  }

  async checkRegistrationExists(
    createSubjectRegDTO: CreateStudentSubjectRegistrationDto,
  ) {
    return await this.studentSubjectRegRepository.findOne({
      where: {
        student_id: createSubjectRegDTO.student_id,
        class_id: createSubjectRegDTO.class_id,
        session_id: createSubjectRegDTO.session_id,
        subject_id: createSubjectRegDTO.subject_id,
      },
    });
  }
}
