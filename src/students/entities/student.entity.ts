import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Gender } from '../../types/types';

@Entity()
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  constructor(student: Partial<Student>) {
    Object.assign(this, student);
  }
}

//     `class` varchar(15) DEFAULT NULL,
//     `session` varchar(9) DEFAULT NULL
