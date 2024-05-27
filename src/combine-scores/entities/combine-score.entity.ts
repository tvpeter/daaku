import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('combine_scores')
export class CombineScore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0.0 })
  term_1: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0.0 })
  term_2: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0.0 })
  term_3: number;

  @Column({ type: 'numeric', precision: 4, scale: 2, default: 0.0 })
  average: number;

  @Column({ type: 'numeric', default: 0 })
  position: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
