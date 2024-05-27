import { Session } from '@app/sessions/entities/session.entity';
import { Studentclass } from '@app/studentclass/entities/studentclass.entity';
import { Student } from '@app/students/entities/student.entity';
import { Subject } from '@app/subjects/entities/subject.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('combine_scores')
export class CombineScore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  student_id: number;

  @ManyToOne(() => Student, (student) => student.combineScore)
  @JoinColumn({ name: 'student_id', referencedColumnName: 'id' })
  student: Student;

  @Column()
  class_id: number;

  @ManyToOne(() => Studentclass, (studentClass) => studentClass.combineScore)
  @JoinColumn({ name: 'class_id', referencedColumnName: 'id' })
  studentClass: Studentclass;

  @Column()
  session_id: number;

  @ManyToOne(() => Session, (session) => session.scores)
  @JoinColumn({ name: 'session_id', referencedColumnName: 'id' })
  session: Session;

  @Column()
  subject_id: number;

  @ManyToOne(() => Subject, (subject) => subject.scores)
  @JoinColumn({ name: 'subject_id', referencedColumnName: 'id' })
  subject: Subject;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0.0 })
  term_1: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0.0 })
  term_2: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0.0 })
  term_3: number;

  @Column({ type: 'numeric', precision: 4, scale: 2, default: 0.0 })
  average: number;

  @Column({ type: 'numeric', default: 0 })
  position: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
