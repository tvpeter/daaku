import { Session } from '@app/sessions/entities/session.entity';
import { Studentclass } from '@app/studentclass/entities/studentclass.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('class_datum')
export class ClassDatum {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  class_id: number;

  @ManyToOne(() => Studentclass, (studentClass) => studentClass.classData)
  @JoinColumn({ name: 'class_id', referencedColumnName: 'id' })
  studentClass: Studentclass;

  @Column()
  session_id: number;

  @ManyToOne(() => Session, (session) => session.classData)
  @JoinColumn({ name: 'session_id', referencedColumnName: 'id' })
  session: Session;

  @Column({ default: 0 })
  total_subjects: number;

  @Column({ default: 0 })
  total_students: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
