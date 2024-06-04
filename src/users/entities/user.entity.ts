import { Account } from '@app/accounts/entities/account.entity';
import { Announcement } from '@app/announcements/entities/announcement.entity';
import { UserStatus, UserRole } from '@app/shared/enums';
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

  @Column()
  password: string;

  @Column({ nullable: true })
  sig_url: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;

  @OneToMany(() => Studentclass, (student_class) => student_class.teacher)
  studentClass: Studentclass[];

  @OneToMany(() => Announcement, (announcements) => announcements.user)
  announcements: Announcement[];

  @Column({ type: 'enum', enum: UserRole, default: UserRole.STAFF })
  role: UserRole;

  @OneToMany(() => Account, (account) => account.user)
  account: Account;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
