import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Gender } from '@app/common/enums';
import { StudentClassSeederService } from '@app/studentclass/studentclass.seeder.service';
import { SessionSeederService } from '@app/sessions/session.seeder.service';

@Injectable()
export class StudentSeederService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly studentclassSeederService: StudentClassSeederService,
    private readonly sessionSeederService: SessionSeederService,
  ) {}

  async generateStudents(): Promise<Student[]> {
    const studentClassIds =
      await this.studentclassSeederService.studentClassIds();
    const sessionIds = await this.sessionSeederService.sessionIds();
    const students = [];

    for (let i = 0; i < 1000; i++) {
      const student = new Student();
      student.name = faker.person.fullName();
      student.admission_number = faker.string.numeric(5);
      student.dob = faker.date.birthdate().toDateString();
      student.gender = faker.helpers.enumValue(Gender);
      student.address = faker.location.streetAddress();
      student.phone = faker.phone.number();
      student.email = faker.internet.email();
      student.passport_url = faker.internet.url();
      student.current_class_id = faker.helpers.arrayElement(studentClassIds);
      student.current_session_id = faker.helpers.arrayElement(sessionIds);
      students.push(student);
    }

    return students;
  }

  async count(): Promise<number> {
    return await this.studentRepository.count();
  }

  async seedData(): Promise<void> {
    const count = await this.count();
    if (count > 0) return;
    const students = await this.generateStudents();
    await this.studentRepository.save(students);
  }
}
