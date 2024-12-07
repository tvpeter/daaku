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

@Entity('student_subject_registration')
export class StudentSubjectRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  student_id: number;

  @ManyToOne(() => Student, (student) => student.studentSubjects)
  @JoinColumn({ name: 'student_id', referencedColumnName: 'id' })
  student: Student;

  @Column()
  class_id: number;

  @ManyToOne(() => Studentclass, (studentClass) => studentClass.studentSubjects)
  @JoinColumn({ name: 'class_id', referencedColumnName: 'id' })
  studentClass: Studentclass;

  @Column()
  session_id: number;

  @ManyToOne(() => Session, (session) => session.studentSubjects)
  @JoinColumn({ name: 'session_id', referencedColumnName: 'id' })
  session: Session;

  @Column()
  subject_id: number;

  @ManyToOne(() => Subject, (subject) => subject.studentSubjects)
  @JoinColumn({ name: 'subject_id', referencedColumnName: 'id' })
  subject: Subject;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
