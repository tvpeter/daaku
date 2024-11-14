import { Session } from '@app/sessions/entities/session.entity';
import { Studentclass } from '@app/studentclass/entities/studentclass.entity';
import { User } from '@app/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class SessionClassTeacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  session_id: number;

  @ManyToOne(() => Session, (session) => session.sessionClassTeacher)
  @JoinColumn({ name: 'session_id', referencedColumnName: 'id' })
  session: Session;

  @Column()
  class_id: number;

  @ManyToOne(
    () => Studentclass,
    (studentClass) => studentClass.sessionClassTeacher,
  )
  @JoinColumn({ name: 'class_id', referencedColumnName: 'id' })
  studentClass: Session;

  @Column()
  user_id: number;

  @ManyToOne(() => User, (teacher) => teacher.sessionClassTeacher)
  @JoinColumn({ name: 'class_id', referencedColumnName: 'id' })
  teacher: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
