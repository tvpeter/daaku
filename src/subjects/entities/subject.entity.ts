import { ScoreMetaDatum } from '@app/score-meta-data/entities/score-meta-datum.entity';
import { Score } from '@app/scores/entities/score.entity';
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

  @OneToMany(() => ScoreMetaDatum, (scoreMetaData) => scoreMetaData.subject)
  scoreMetaData: ScoreMetaDatum;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
