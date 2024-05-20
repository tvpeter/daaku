import { Session } from 'src/sessions/entities/session.entity';
import { ResultStatusEnum, SchoolTerm } from 'src/shared/types';
import { Studentclass } from 'src/studentclass/entities/studentclass.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('term_status')
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

  @OneToMany(() => Session, (session) => session.result_status)
  @JoinColumn({ name: 'session_id', referencedColumnName: 'id' })
  session: Session;

  @OneToMany(() => Studentclass, (student_class) => student_class.result_status)
  class: Studentclass;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
