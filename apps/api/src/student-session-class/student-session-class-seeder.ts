import { AbstractSeeder } from '@app/seeder/abstract.seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentSessionClass } from './entities/student-session-class.entity';
import { Repository } from 'typeorm';
import { StudentClassSeederService } from '@app/studentclass/studentclass.seeder.service';
import { SessionSeederService } from '@app/sessions/session.seeder.service';
import { StudentSeederService } from '@app/students/student.seeder.service';
import { faker } from '@faker-js/faker';

export class StudentSessionClassSeeder extends AbstractSeeder {
  constructor(
    @InjectRepository(StudentSessionClass)
    private readonly studentSessionClassRepo: Repository<StudentSessionClass>,
    private readonly studentClassSeeder: StudentClassSeederService,
    private readonly sessionSeederService: SessionSeederService,
    private readonly studentsSeederService: StudentSeederService,
  ) {
    super();
  }

  async seed(): Promise<void> {
    const count = await this.count();
    if (count > 10) return;

    const data = await this.generateData();
    await this.resetAutoIds();
    await this.studentSessionClassRepo.save(data);
  }

  async generateData(): Promise<StudentSessionClass[]> {
    const studentSessionClassData = [];

    const studentClassIds = await this.studentClassSeeder.studentClassIds();
    const sessionIds = await this.sessionSeederService.sessionIds();
    const studentIds = await this.studentsSeederService.getStudentsId();

    studentIds.map((studentId) => {
      studentSessionClassData.push({
        student_id: studentId,
        class_id: faker.helpers.arrayElement(studentClassIds),
        session_id: faker.helpers.arrayElement(sessionIds),
      });
    });

    return studentSessionClassData;
  }
  async count(): Promise<number> {
    return await this.studentSessionClassRepo.count();
  }

  async resetAutoIds() {
    const entityManager = this.studentSessionClassRepo.manager;

    await entityManager.query(
      'ALTER TABLE student_session_class AUTO_INCREMENT=1;',
    );
  }
}
