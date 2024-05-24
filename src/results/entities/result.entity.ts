import { SchoolTerm } from '@app/shared/types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('results')
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: SchoolTerm })
  term: SchoolTerm;

  @Column({ default: 0 })
  subjects_total: number;

  @Column({
    type: 'numeric',
    nullable: true,
    default: 0,
    precision: 4,
    scale: 2,
  })
  student_total: number;

  @Column({
    type: 'numeric',
    nullable: true,
    default: 0.0,
    precision: 4,
    scale: 2,
  })
  student_avg: number;

  @Column()
  position: number;

  @Column({ type: 'text', nullable: true })
  principal_comments: string;

  @Column({ nullable: true, type: 'text' })
  teacher_comment: string;

  @Column({ default: 0, nullable: true })
  checks: number;
}
