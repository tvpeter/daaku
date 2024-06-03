import { Session } from '@app/sessions/entities/session.entity';
import { SchoolTerm } from '@app/shared/enums';
import { Studentclass } from '@app/studentclass/entities/studentclass.entity';
import { Student } from '@app/students/entities/student.entity';
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

@Entity('results')
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: SchoolTerm })
  term: SchoolTerm;

  @Column({ default: 0 })
  subjects_total: number;

  @Column({
    type: 'numeric',
    nullable: true,
    default: 0,
    precision: 4,
    scale: 2,
  })
  student_total: number;

  @Column({
    type: 'numeric',
    nullable: true,
    default: 0.0,
    precision: 4,
    scale: 2,
  })
  student_avg: number;

  @Column()
  position: number;

  @Column({ type: 'text', nullable: true })
  principal_comments: string;

  @Column({ nullable: true, type: 'text' })
  teacher_comment: string;

  @Column({ default: 0, nullable: true })
  checks: number;

  @Column()
  student_id: number;

  @ManyToOne(() => Student, (student) => student.results)
  @JoinColumn({ name: 'student_id', referencedColumnName: 'id' })
  student: Student;

  @Column()
  class_id: number;

  @ManyToOne(() => Studentclass, (studentClass) => studentClass.results)
  @JoinColumn({ name: 'class_id', referencedColumnName: 'id' })
  class: Studentclass;

  @Column()
  session_id: number;

  @ManyToOne(() => Session, (session) => session.results)
  @JoinColumn({ name: 'session_id', referencedColumnName: 'id' })
  session: Session;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
