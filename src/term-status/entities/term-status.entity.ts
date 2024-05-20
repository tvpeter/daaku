import { SchoolTerm } from 'src/shared/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('term_status')
export class TermStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: SchoolTerm, default: SchoolTerm.TERM_I })
  term: SchoolTerm;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
