import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ScoreMetaDatum } from '@app/score-meta-data/entities/score-meta-datum.entity';
import { ResultStatus } from '@app/result-status/entities/result-status.entity';
import { Score } from '@app/scores/entities/score.entity';
import { Result } from '@app/results/entities/result.entity';
import { CombineScore } from '@app/combine-scores/entities/combine-score.entity';
import { SessionStatus } from '@app/common/enums';
import { StudentSessionClass } from '@app/student-session-class/entities/student-session-class.entity';
import { SessionClassTeacher } from '@app/session-class-teacher/entities/session-class-teacher.entity';
import { StudentSubjectRegistration } from '@app/student-subject-registration/entities/student-subject-registration.entity';
import { ClassDatum } from '@app/class-datum/entities/class-datum.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'enum', enum: SessionStatus, default: SessionStatus.OPEN })
  status: SessionStatus;

  @OneToMany(() => ResultStatus, (resultStatus) => resultStatus.session)
  resultStatus: ResultStatus[];

  @OneToMany(() => Score, (scores) => scores.session)
  scores: Score[];

  @OneToMany(() => CombineScore, (combineScore) => combineScore.session)
  combineScores: CombineScore[];

  @OneToMany(() => ScoreMetaDatum, (scoreMetaData) => scoreMetaData.session)
  scoreMetaData: ScoreMetaDatum[];

  @OneToMany(() => Result, (results) => results.session)
  results: Result[];

  @OneToMany(
    () => StudentSessionClass,
    (studentSessionClass) => studentSessionClass.session,
  )
  studentSessionClass: StudentSessionClass[];

  @OneToMany(
    () => SessionClassTeacher,
    (sessionClassTeacher) => sessionClassTeacher.session,
  )
  sessionClassTeacher: SessionClassTeacher[];

  @OneToMany(
    () => StudentSubjectRegistration,
    (studentSubjects) => studentSubjects.session,
  )
  studentSubjects: StudentSubjectRegistration[];

  @OneToMany(() => ClassDatum, (classData) => classData.session)
  classData: ClassDatum[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
