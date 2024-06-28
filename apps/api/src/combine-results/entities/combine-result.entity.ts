import { Session } from '@app/sessions/entities/session.entity';
import { Studentclass } from '@app/studentclass/entities/studentclass.entity';
import { Student } from '@app/students/entities/student.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('combine_results')
export class CombineResult {
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
