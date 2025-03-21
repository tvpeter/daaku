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
import { FindStudentSubjectRegQueryDto } from './dto/find-student-subject-reg-query.dto';
import { StudentSubjectsDto } from './dto/student-subjects.dto';

@Injectable()
export class StudentSubjectRegistrationService {
  constructor(
    @InjectRepository(StudentSubjectRegistration)
    private readonly studentSubjectRegRepository: Repository<StudentSubjectRegistration>,
    private readonly sessionService: SessionsService,
  ) {}
  async create(createSubjectRegDTO: CreateStudentSubjectRegistrationDto) {
    // check the total subjects registered by the student
    const totalSubjectsRegistered = await this.subjectRegisteredByStudent(
      createSubjectRegDTO.student_id,
      createSubjectRegDTO.class_id,
      createSubjectRegDTO.session_id,
    );

    // fetch the required subjects total and compare,
    // TODO: fetch the required subjects total
    if (totalSubjectsRegistered >= 13) {
      throw new BadRequestException(
        'Student can only register for a maximum of 5 subjects',
      );
    }

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

  async findAll(query: FindStudentSubjectRegQueryDto) {
    const whereClause: any = {};
    const relations: any = {};

    if (query.subject_id) {
      whereClause.subject_id = query.subject_id;
      relations.subject = true;
    }

    if (query.class_id) {
      whereClause.class_id = query.class_id;
      relations.studentClass = true;
    }

    if (query.session_id) {
      whereClause.session_id = query.session_id;
      relations.session = true;
    }
    return await this.studentSubjectRegRepository.find({
      where: whereClause,
      relations,
    });
  }

  async findStudentSubjects(
    qeury: StudentSubjectsDto,
  ): Promise<StudentSubjectRegistration[]> {
    const studentSubjectsForTheSession =
      await this.studentSubjectRegRepository.find({
        where: {
          student_id: qeury.student_id,
          class_id: qeury.class_id,
          session_id: qeury.session_id,
        },
        relations: {
          subject: true,
          session: true,
          studentClass: true,
        },
      });

    if (!studentSubjectsForTheSession) {
      throw new NotFoundException('Student subjects not found');
    }
    return studentSubjectsForTheSession;
  }

  async findOneById(id: number): Promise<StudentSubjectRegistration> {
    const studentSubject = await this.studentSubjectRegRepository.findOne({
      where: { id },
    });

    if (!studentSubject) {
      throw new NotFoundException('Student subject not found');
    }
    return studentSubject;
  }

  async update(
    id: number,
    updateStudentSubjectRegDTO: UpdateStudentSubjectRegistrationDto,
  ) {
    const studentSubject = await this.findOneById(id);

    return await this.studentSubjectRegRepository.save({
      ...studentSubject,
      ...updateStudentSubjectRegDTO,
    });
  }

  async deleteStudentSubject(
    query: StudentSubjectsDto,
  ): Promise<StudentSubjectRegistration[]> {
    const studentsSubjects = await this.findStudentSubjects(query);

    return await this.studentSubjectRegRepository.softRemove(studentsSubjects);
  }

  async remove(id: number) {
    const studentSubject = await this.findOneById(id);

    return await this.studentSubjectRegRepository.softRemove(studentSubject);
  }

  async checkRegistrationExists(
    createSubjectRegDTO: CreateStudentSubjectRegistrationDto,
  ) {
    const studentSubject = await this.studentSubjectRegRepository.findOne({
      where: {
        student_id: createSubjectRegDTO.student_id,
        class_id: createSubjectRegDTO.class_id,
        session_id: createSubjectRegDTO.session_id,
        subject_id: createSubjectRegDTO.subject_id,
      },
    });

    if (studentSubject) return true;
    return false;
  }

  async subjectRegisteredByStudent(
    student_id: number,
    class_id: number,
    session_id: number,
  ): Promise<number> {
    return await this.studentSubjectRegRepository.count({
      where: { student_id, class_id, session_id },
    });
  }
}
