import { Session } from 'src/sessions/entities/session.entity';
import { ResultStatusEnum, SchoolTerm } from 'src/shared/types';
import { Studentclass } from 'src/studentclass/entities/studentclass.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('result_status')
export class ResultStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: SchoolTerm, default: SchoolTerm.TERM_I })
  term: SchoolTerm;

  @Column({
    type: 'enum',
    enum: ResultStatusEnum,
    default: ResultStatusEnum.PROCESSING,
  })
  result_status: ResultStatusEnum;

  @ManyToOne(() => Session, (session) => session.result_status)
  @JoinColumn({ name: 'session_id', referencedColumnName: 'id' })
  session: Session;

  @ManyToOne(() => Studentclass, (student_class) => student_class.result_status)
  @JoinColumn({ name: 'class_id', referencedColumnName: 'id' })
  class: Studentclass;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
