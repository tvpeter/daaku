import { Session } from '@app/sessions/entities/session.entity';
import { SchoolTerm, ResultStatusEnum } from '@app/shared/enums';
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

  @Column({ name: 'session_id', nullable: false })
  session_id: number;

  @ManyToOne(() => Session, (session) => session.resultStatus)
  @JoinColumn({ name: 'session_id', referencedColumnName: 'id' })
  session: Session;

  @Column({ name: 'class_id' })
  class_id: number;

  @ManyToOne(() => Studentclass, (student_class) => student_class.result_status)
  @JoinColumn({ name: 'class_id', referencedColumnName: 'id' })
  studentClass: Studentclass;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
