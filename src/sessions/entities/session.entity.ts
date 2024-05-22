import { SessionStatus } from 'src/shared/types';
import { ResultStatus } from 'src/result-status/entities/result-status.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Student } from 'src/students/entities/student.entity';
import { Score } from 'src/scores/entities/score.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'enum', enum: SessionStatus, default: SessionStatus.OPEN })
  status: SessionStatus;

  @OneToMany(() => ResultStatus, (resultStatus) => resultStatus.session)
  resultStatus: ResultStatus;

  @OneToMany(() => Student, (student) => student.session)
  students: Student;

  @OneToMany(() => Score, (scores) => scores.session)
  scores: Score[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
