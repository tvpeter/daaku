import { Studentclass } from 'src/studentclass/entities/studentclass.entity';
import { Role, Status } from 'src/types/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
