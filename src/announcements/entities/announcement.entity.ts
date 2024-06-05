import { AnnouncementStatus } from '@app/common/enums';
import { User } from '@app/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('announcements')
export class Announcement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  topic: string;

  @Column({ type: 'text' })
  body: string;

  @Column({
    type: 'enum',
    enum: AnnouncementStatus,
    default: AnnouncementStatus.UNPUBLISHED,
  })
  status: AnnouncementStatus;

  @Column()
  user_id: number;

  @ManyToOne(() => User, (user) => user.announcements)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
