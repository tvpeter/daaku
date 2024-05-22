import { ResultStatus } from 'src/result-status/entities/result-status.entity';
import { Score } from 'src/scores/entities/score.entity';
import { Student } from 'src/students/entities/student.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Studentclass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @OneToMany(() => Student, (student) => student.class)
  students: Student[];

  @OneToMany(() => ResultStatus, (result_status) => result_status.studentClass)
  result_status: ResultStatus;

  @OneToMany(() => Score, (scores) => scores.studentClass)
  scores: Score[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
