import { CombineScore } from '@app/combine-scores/entities/combine-score.entity';
import { Gender } from '@app/common/enums';
import { Result } from '@app/results/entities/result.entity';
import { Score } from '@app/scores/entities/score.entity';
import { Session } from '@app/sessions/entities/session.entity';
import { StudentSessionClass } from '@app/student-session-class/entities/student-session-class.entity';
import { Studentclass } from '@app/studentclass/entities/studentclass.entity';
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

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  admission_number: string;

  @Column({ type: 'date' })
  dob: string;

  @Column({ type: 'enum', enum: Gender, default: Gender.MALE })
  gender: Gender;

  @Column({ type: 'text' })
  address: string;

  @Column({ nullable: true, unique: true })
  phone: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ nullable: true })
  passport_url: string;

  @Column()
  current_class_id: number;

  @ManyToOne(() => Studentclass, (studentClass) => studentClass.students)
  @JoinColumn({ name: 'current_class_id', referencedColumnName: 'id' })
  class: Studentclass;

  @Column()
  current_session_id: number;

  @ManyToOne(() => Session, (session) => session.students)
  @JoinColumn({ name: 'current_session_id', referencedColumnName: 'id' })
  session: Session;

  @OneToMany(() => Score, (score) => score.student)
  scores: Score[];

  @OneToMany(() => CombineScore, (combine_scores) => combine_scores.student)
  combineScore: CombineScore[];

  @OneToMany(() => Result, (result) => result.student)
  results: Result[];

  @OneToMany(() => StudentSessionClass, (sessionClass) => sessionClass.student)
  studentSessionClass: StudentSessionClass[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
