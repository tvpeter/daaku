import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ScoreMetaDatum } from '@app/score-meta-data/entities/score-meta-datum.entity';
import { SessionStatus } from '@app/shared/types';
import { ResultStatus } from '@app/result-status/entities/result-status.entity';
import { Student } from '@app/students/entities/student.entity';
import { Score } from '@app/scores/entities/score.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'enum', enum: SessionStatus, default: SessionStatus.OPEN })
  status: SessionStatus;

  @OneToMany(() => ResultStatus, (resultStatus) => resultStatus.session)
  resultStatus: ResultStatus;

  @OneToMany(() => Student, (student) => student.session)
  students: Student;

  @OneToMany(() => Score, (scores) => scores.session)
  scores: Score[];

  @OneToMany(() => ScoreMetaDatum, (scoreMetaData) => scoreMetaData.session)
  scoreMetaData: ScoreMetaDatum;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
