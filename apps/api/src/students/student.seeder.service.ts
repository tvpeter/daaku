import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Gender } from '@app/common/enums';
import { AbstractSeeder } from '@app/seeder/abstract.seeder';

@Injectable()
export class StudentSeederService extends AbstractSeeder {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {
    super();
  }

  async generateData(): Promise<Student[]> {
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
    await this.resetAutoIds();
    await this.studentRepository.save(students);
  }

  async resetAutoIds() {
    const entityManager = this.studentRepository.manager;
    await entityManager.query('ALTER TABLE students AUTO_INCREMENT=1;');
  }

  async getStudentsId(): Promise<number[]> {
    const students = await this.studentRepository.find();
    return students.map((student) => student.id);
  }
}
