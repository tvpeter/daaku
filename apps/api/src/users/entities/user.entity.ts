import { Account } from '@app/accounts/entities/account.entity';
import { Announcement } from '@app/announcements/entities/announcement.entity';
import { UserStatus, UserRole } from '@app/common/enums';
import { SessionClassTeacher } from '@app/session-class-teacher/entities/session-class-teacher.entity';
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

  @Column({ nullable: true })
  token: string;

  @OneToMany(() => Studentclass, (student_class) => student_class.user)
  studentClass: Studentclass[];

  @OneToMany(() => Announcement, (announcements) => announcements.user)
  announcements: Announcement[];

  @Column({ type: 'enum', enum: UserRole, default: UserRole.STAFF })
  role: UserRole;

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];

  @OneToMany(
    () => SessionClassTeacher,
    (sessionClassTeacher) => sessionClassTeacher.teacher,
  )
  sessionClassTeacher: SessionClassTeacher[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
