import { Session } from '@app/sessions/entities/session.entity';
import { SchoolTerm } from '@app/common/enums';
import { Studentclass } from '@app/studentclass/entities/studentclass.entity';
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

@Entity()
export class ScoreMetaDatum {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, default: 0 })
  total_students: number;

  @Column({ type: 'enum', enum: SchoolTerm })
  term: SchoolTerm;

  @Column({
    type: 'numeric',
    nullable: true,
    default: 0.0,
    precision: 4,
    scale: 2,
  })
  class_avg: number;

  @Column({
    type: 'numeric',
    nullable: true,
    default: 0.0,
    precision: 4,
    scale: 2,
  })
  lowest_score: number;

  @Column({
    type: 'numeric',
    nullable: true,
    default: 0.0,
    precision: 4,
    scale: 2,
  })
  highest_score: number;

  @Column()
  class_id: number;

  @ManyToOne(() => Studentclass, (sudentClass) => sudentClass.scoreMetaData)
  @JoinColumn({ name: 'class_id', referencedColumnName: 'id' })
  studentClass: Studentclass;

  @Column()
  subject_id: number;

  @ManyToOne(() => Subject, (subject) => subject.scoreMetaData)
  @JoinColumn({ name: 'subject_id', referencedColumnName: 'id' })
  subject: Subject;

  @Column()
  session_id: number;

  @ManyToOne(() => Session, (session) => session.scoreMetaData)
  @JoinColumn({ name: 'session_id', referencedColumnName: 'id' })
  session: Session;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
