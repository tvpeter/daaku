import { ResultStatus } from '@app/result-status/entities/result-status.entity';
import { Result } from '@app/results/entities/result.entity';
import { ScoreMetaDatum } from '@app/score-meta-data/entities/score-meta-datum.entity';
import { Score } from '@app/scores/entities/score.entity';
import { Student } from '@app/students/entities/student.entity';
import { User } from '@app/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('student_class')
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

  @OneToMany(() => Result, (results) => results.class)
  results: Result[];

  @Column({ nullable: true })
  user_id: number;

  @ManyToOne(() => User, (teacher) => teacher.student_class)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  teacher: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
