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
import { Student } from '@app/students/entities/student.entity';
import { Score } from '@app/scores/entities/score.entity';
import { Result } from '@app/results/entities/result.entity';
import { CombineScore } from '@app/combine-scores/entities/combine-score.entity';
import { SessionStatus } from '@app/common/enums';
import { StudentSessionClass } from '@app/student-session-class/entities/student-session-class.entity';

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

  @OneToMany(() => Student, (student) => student.session)
  students: Student[];

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
