import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Gender } from '../types/gender.types';

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

  // coming back to add other fields and relationships
}

// CREATE TABLE `students` (
//     `name` varchar(35) NOT NULL,
//     `admno` varchar(10) DEFAULT NULL,
//     `dob` varchar(14) DEFAULT NULL,
//     `sex` varchar(6) DEFAULT NULL,
//     `address` varchar(70) DEFAULT NULL,
//     `phone` varchar(15) DEFAULT NULL,
//     `email` varchar(35) DEFAULT NULL,
//     `passport` varchar(100) DEFAULT NULL,
//     `class` varchar(15) DEFAULT NULL,
//     `dater` varchar(14) DEFAULT NULL,
//     `session` varchar(9) DEFAULT NULL
//   ) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
