import { Studentclass } from 'src/studentclass/entities/studentclass.entity';
import { Role, Status } from 'src/shared/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Account } from 'src/accounts/entities/account.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  sig_url: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status: Status;

  @OneToMany(() => Studentclass, (student_class) => student_class.id)
  student_class: Studentclass[];

  @Column({ type: 'enum', enum: Role, default: Role.STAFF })
  role: Role;

  @OneToMany(() => Account, (account) => account.user_id)
  account: Account;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
