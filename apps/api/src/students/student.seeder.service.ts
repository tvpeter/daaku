import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Gender } from '@app/common/enums';
import { SessionSeederService } from '@app/sessions/session.seeder.service';
import { StudentClassSeederService } from '@app/studentclass/studentclass.seeder.service';
import { AbstractSeeder } from '@app/seeder/abstract.seeder';

@Injectable()
export class StudentSeederService extends AbstractSeeder {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @Inject(forwardRef(() => StudentClassSeederService))
    private readonly studentclassSeeder: StudentClassSeederService,
    private readonly sessionSeederService: SessionSeederService,
  ) {
    super();
  }

  async generateData(): Promise<Student[]> {
    const studentClassIds = await this.studentclassSeeder.studentClassIds();
    const sessionIds = await this.sessionSeederService.sessionIds();
    const students = [];
    const usedAdmissionNumbers = new Set<string>();

    for (let i = 0; i < 1000; i++) {
      const dob = faker.date.birthdate();
      const dobFormatted =
        String(dob.getFullYear()).padStart(4, '0') +
        '/' +
        String(dob.getMonth() + 1).padStart(2, '0') +
        '/' +
        String(dob.getDate()).padStart(2, '0');

      let admissionNumber: string;
      do {
        admissionNumber = faker.string.numeric(5);
      } while (usedAdmissionNumbers.has(admissionNumber));

      usedAdmissionNumbers.add(admissionNumber);

      const student = new Student();
      student.name = faker.person.fullName();
      student.admission_number = admissionNumber;
      student.dob = dobFormatted;
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

  async seed(): Promise<void> {
    const count = await this.count();
    if (count > 0) return;
    const students = await this.generateData();
    await this.studentRepository.save(students);
  }
}
