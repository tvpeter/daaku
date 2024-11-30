import { CombineScore } from '@app/combine-scores/entities/combine-score.entity';
import { ResultStatus } from '@app/result-status/entities/result-status.entity';
import { Result } from '@app/results/entities/result.entity';
import { ScoreMetaDatum } from '@app/score-meta-data/entities/score-meta-datum.entity';
import { Score } from '@app/scores/entities/score.entity';
import { SessionClassTeacher } from '@app/session-class-teacher/entities/session-class-teacher.entity';
import { StudentSessionClass } from '@app/student-session-class/entities/student-session-class.entity';
import { User } from '@app/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
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

  @OneToMany(() => ResultStatus, (result_status) => result_status.studentClass)
  result_status: ResultStatus[];

  @OneToMany(() => Score, (scores) => scores.studentClass)
  scores: Score[];

  @OneToMany(
    () => ScoreMetaDatum,
    (scoreMetaData) => scoreMetaData.studentClass,
  )
  scoreMetaData: ScoreMetaDatum[];

  @OneToMany(() => Result, (results) => results.class)
  results: Result[];

  @Column({ nullable: true })
  user_id: number;

  @ManyToOne(() => User, (user) => user.studentClass)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @OneToMany(() => CombineScore, (combineScore) => combineScore.studentClass)
  combineScore: CombineScore[];

  @OneToMany(
    () => StudentSessionClass,
    (studentSession) => studentSession.studentClass,
  )
  studentSessionClass: StudentSessionClass[];

  @OneToMany(
    () => SessionClassTeacher,
    (sessionClassTeacher) => sessionClassTeacher.studentClass,
  )
  sessionClassTeacher: SessionClassTeacher[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
