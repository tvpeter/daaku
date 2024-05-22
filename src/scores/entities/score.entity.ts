import { Session } from 'src/sessions/entities/session.entity';
import { SchoolTerm } from 'src/shared/types';
import { Studentclass } from 'src/studentclass/entities/studentclass.entity';
import { Student } from 'src/students/entities/student.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
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

@Entity('scores')
export class Score {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: SchoolTerm })
  term: SchoolTerm;

  @Column({
    type: 'numeric',
    nullable: false,
    default: 0.0,
    precision: 3,
    scale: 2,
  })
  test: number;

  @Column({
    type: 'numeric',
    nullable: false,
    default: 0.0,
    precision: 4,
    scale: 2,
  })
  exam: number;

  @Column({
    type: 'decimal',
    nullable: false,
    default: 0.0,
    precision: 4,
    scale: 2,
  })
  total: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  subject_position: number;

  @Column()
  student_id: number;

  @ManyToOne(() => Student, (student) => student.scores)
  @JoinColumn({ name: 'student_id', referencedColumnName: 'id' })
  student: Student;

  @Column()
  class_id: number;

  @ManyToOne(() => Studentclass, (studentClass) => studentClass.scores)
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
