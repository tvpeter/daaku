import { CombineScore } from '@app/combine-scores/entities/combine-score.entity';
import { ScoreMetaDatum } from '@app/score-meta-data/entities/score-meta-datum.entity';
import { Score } from '@app/scores/entities/score.entity';
import { StudentSubjectRegistration } from '@app/student-subject-registration/entities/student-subject-registration.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Score, (scores) => scores.subject)
  scores: Score[];

  @OneToMany(() => CombineScore, (combineScore) => combineScore.subject)
  combineScore: CombineScore[];

  @OneToMany(() => ScoreMetaDatum, (scoreMetaData) => scoreMetaData.subject)
  scoreMetaData: ScoreMetaDatum[];

  @OneToMany(
    () => StudentSubjectRegistration,
    (studentSubjects) => studentSubjects.subject,
  )
  studentSubjects: StudentSubjectRegistration[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
