import { Account } from '@app/accounts/entities/account.entity';
import { Announcement } from '@app/announcements/entities/announcement.entity';
import { Status, Role } from '@app/shared/types';
import { Studentclass } from '@app/studentclass/entities/studentclass.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  name: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  sig_url: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status: Status;

  @OneToMany(() => Studentclass, (student_class) => student_class.teacher)
  student_class: Studentclass[];

  @OneToMany(() => Announcement, (announcements) => announcements.user)
  announcements: Announcement[];

  @Column({ type: 'enum', enum: Role, default: Role.STAFF })
  role: Role;

  @OneToMany(() => Account, (account) => account.user_id)
  account: Account;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
