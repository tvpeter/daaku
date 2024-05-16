import { Banks } from 'src/types/types';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: Banks })
  bank: Banks;

  @Column()
  account_name: string;

  @OneToOne(() => User, (user) => user.id)
  user_id: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
