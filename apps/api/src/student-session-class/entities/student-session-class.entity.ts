import { Session } from '@app/sessions/entities/session.entity';
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

@Entity('student_session_class')
export class StudentSessionClass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  student_id: number;

  @ManyToOne(() => Student, (student) => student.studentSessionClass)
  @JoinColumn({ name: 'student_id', referencedColumnName: 'id' })
  student: Student;

  @Column()
  class_id: number;

  @ManyToOne(
    () => Studentclass,
    (studentClass) => studentClass.studentSessionClass,
  )
  @JoinColumn({ name: 'class_id', referencedColumnName: 'id' })
  studentClass: Studentclass;

  @Column()
  session_id: number;

  @ManyToOne(() => Session, (session) => session.studentSessionClass)
  @JoinColumn({ name: 'session_id', referencedColumnName: 'id' })
  session: Session;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
