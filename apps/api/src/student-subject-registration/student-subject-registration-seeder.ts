import { AbstractSeeder } from '@app/seeder/abstract.seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentSubjectRegistration } from './entities/student-subject-registration.entity';
import { Repository } from 'typeorm';
import { SubjectsSeederService } from '@app/subjects/subjects.seeder.service';
import { StudentSessionClassSeeder } from '@app/student-session-class/student-session-class-seeder';

export class StudentSubjectRegistrationSeeder extends AbstractSeeder {
  constructor(
    @InjectRepository(StudentSubjectRegistration)
    private readonly studentSubjectRegRepo: Repository<StudentSubjectRegistration>,
    private readonly subjectsSeederService: SubjectsSeederService,
    private readonly studentSessionClassSeeder: StudentSessionClassSeeder,
  ) {
    super();
  }

  async seed(): Promise<void> {
    const count = await this.count();
    if (count > 10) return;

    const data = await this.generateData();
    await this.resetAutoIds();
    await this.studentSubjectRegRepo.save(data);
  }

  async generateData(): Promise<StudentSubjectRegistration[]> {
    const studentSubjectData = [];

    const subjectIds = await this.subjectsSeederService.getSubjectsId();
    const studentSessionClassData =
      await this.studentSessionClassSeeder.getStudentSessionClassData();

    studentSessionClassData.map((studentSessionClass) => {
      for (let i = 0; i < 10; i++) {
        studentSubjectData.push({
          student_id: studentSessionClass.student_id,
          session_id: studentSessionClass.session_id,
          class_id: studentSessionClass.class_id,
          subject_id: subjectIds[i],
        });
      }
    });

    return studentSubjectData;
  }

  count(): Promise<number> {
    return this.studentSubjectRegRepo.count();
  }

  async resetAutoIds() {
    const entityManager = this.studentSubjectRegRepo.manager;

    await entityManager.query(
      'ALTER TABLE student_subject_registration AUTO_INCREMENT=1',
    );
  }
}
