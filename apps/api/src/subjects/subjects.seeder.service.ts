import { AbstractSeeder } from '@app/seeder/abstract.seeder';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SubjectsSeederService extends AbstractSeeder {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectsRepository: Repository<Subject>,
  ) {
    super();
  }

  async seed() {
    const count = await this.count();
    if (count !== 0) return;
    const data = await this.generateData();
    await this.subjectsRepository.save(data);
  }

  async generateData(): Promise<Subject[]> {
    const data = [];

    const subjects = [
      'Mathematics',
      'Physics',
      'Chemistry',
      'Biology',
      'Computer Science',
      'English',
      'History',
      'Geography',
      'Political Science',
      'Economics',
      'Philosophy',
      'Psychology',
      'Sociology',
      'Agriculture',
      'Business Studies',
      'Introductory Technology',
      'Arts',
      'Literature in English',
      'Music',
      'Visual Arts',
    ];

    subjects.forEach((subject) => {
      data.push({ name: subject });
    });

    return data;
  }

  async count(): Promise<number> {
    return await this.subjectsRepository.count();
  }
}
