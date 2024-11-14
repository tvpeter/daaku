import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Studentclass } from './entities/studentclass.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { AbstractSeeder } from '@app/seeder/abstract.seeder';
import { UsersService } from '@app/users/users.service';

@Injectable()
export class StudentClassSeederService extends AbstractSeeder {
  constructor(
    @InjectRepository(Studentclass)
    private readonly studentClassRepository: Repository<Studentclass>,
    private readonly userService: UsersService,
  ) {
    super();
  }

  async generateData(): Promise<Studentclass[]> {
    const users = await this.userService.getActiveStaffIDs();
    const data = [];
    const usedClassNames = new Set<string>();

    for (let i = 0; i < 10; i++) {
      const studentClass = new Studentclass();

      let generatedClassName: string;

      do {
        generatedClassName =
          faker.helpers.arrayElement(['JSS', 'SS']) +
          ' ' +
          faker.helpers.arrayElement([1, 2, 3]) +
          '' +
          faker.helpers.arrayElement(['A', 'B', 'C', 'D', 'E', 'F']);
      } while (usedClassNames.has(generatedClassName));
      usedClassNames.add(generatedClassName);
      studentClass.name = generatedClassName;
      studentClass.user_id = users ? faker.helpers.arrayElement(users) : null;
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
    await this.resetAutoIds();
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

  async resetAutoIds() {
    const entityManager = this.studentClassRepository.manager;

    await entityManager.query('ALTER TABLE student_class AUTO_INCREMENT=1;');
  }
}
