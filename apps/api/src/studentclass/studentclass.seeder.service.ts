import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Studentclass } from './entities/studentclass.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

@Injectable()
export class StudentClassSeederService {
  constructor(
    @InjectRepository(Studentclass)
    private readonly studentClassRepository: Repository<Studentclass>,
  ) {}

  async generateData(): Promise<Studentclass[]> {
    const data = [];

    for (let i = 0; i < 10; i++) {
      const studentClass = new Studentclass();
      studentClass.name =
        faker.helpers.arrayElement(['JSS', 'SS']) +
        ' ' +
        faker.helpers.arrayElement([1, 2, 3]) +
        '' +
        faker.helpers.arrayElement(['A', 'B', 'C', 'D', 'E']);
      data.push(studentClass);
    }

    return data;
  }

  async seed(): Promise<void> {
    const count = await this.count();
    if (count > 0) {
      return;
    }
    const data = await this.generateData();
    await this.studentClassRepository.save(data);
  }

  async count(): Promise<number> {
    return await this.studentClassRepository.count();
  }

  async studentClassIds(): Promise<number[]> {
    return await this.studentClassRepository
      .find()
      .then((studentClass) =>
        studentClass.map((studentClass) => studentClass.id),
      );
  }
}
