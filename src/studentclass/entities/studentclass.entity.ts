import { ResultStatus } from '@app/result-status/entities/result-status.entity';
import { ScoreMetaDatum } from '@app/score-meta-data/entities/score-meta-datum.entity';
import { Score } from '@app/scores/entities/score.entity';
import { Student } from '@app/students/entities/student.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Studentclass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @OneToMany(() => Student, (student) => student.class)
  students: Student[];

  @OneToMany(() => ResultStatus, (result_status) => result_status.studentClass)
  result_status: ResultStatus;

  @OneToMany(() => Score, (scores) => scores.studentClass)
  scores: Score[];

  @OneToMany(
    () => ScoreMetaDatum,
    (scoreMetaData) => scoreMetaData.studentClass,
  )
  scoreMetaData: ScoreMetaDatum;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
