import { Student } from 'src/students/entities/student.entity';
import { ResultStatus } from 'src/result-status/entities/result-status.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Studentclass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @OneToOne(() => Student, (student) => student.class)
  student: Student;

  @OneToMany(() => ResultStatus, (result_status) => result_status.class)
  result_status: ResultStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
