import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  // ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Gender } from '../../shared/types';
import { Studentclass } from 'src/studentclass/entities/studentclass.entity';
import { Session } from 'src/sessions/entities/session.entity';

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
  class_id: number;

  @OneToOne(() => Studentclass, (studentClass) => studentClass.student)
  @JoinColumn({ name: 'class_id', referencedColumnName: 'id' })
  class: Studentclass;

  @Column()
  session_id: number;

  @ManyToOne(() => Session, (session) => session.students)
  @JoinColumn({ name: 'session_id', referencedColumnName: 'id' })
  session: Session;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
