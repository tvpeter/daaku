import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSessionClassTeacherDto } from './dto/create-session-class-teacher.dto';
import { UpdateSessionClassTeacherDto } from './dto/update-session-class-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionClassTeacher } from './entities/session-class-teacher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SessionClassTeacherService {
  constructor(
    @InjectRepository(SessionClassTeacher)
    private readonly sessionClassTeacherRepository: Repository<SessionClassTeacher>,
  ) {}

  async create(createSessionClassTeacherDto: CreateSessionClassTeacherDto) {
    const recordExists = await this.checkRecordExists(
      createSessionClassTeacherDto,
    );

    if (recordExists)
      throw new ConflictException(
        'Class already assigned to a teacher for the session',
      );

    const newSessionClassTeacher = this.sessionClassTeacherRepository.create(
      createSessionClassTeacherDto,
    );

    return await this.sessionClassTeacherRepository.save(
      newSessionClassTeacher,
    );
  }

  async findAll() {
    return await this.sessionClassTeacherRepository.find();
  }

  async findOne(id: number) {
    const sessionTeacherClass =
      await this.sessionClassTeacherRepository.findOne({ where: { id } });

    if (!sessionTeacherClass) throw new NotFoundException();

    return sessionTeacherClass;
  }

  async update(
    id: number,
    updateSessionClassTeacherDto: UpdateSessionClassTeacherDto,
  ) {
    const sessionClassTeacher = await this.findOne(id);

    return await this.sessionClassTeacherRepository.save({
      ...sessionClassTeacher,
      ...updateSessionClassTeacherDto,
    });
  }

  async remove(id: number) {
    const sessionClassTeacher = await this.findOne(id);
    return await this.sessionClassTeacherRepository.remove(sessionClassTeacher);
  }

  async checkRecordExists(
    createSessionClassTeacherDto: CreateSessionClassTeacherDto,
  ): Promise<SessionClassTeacher | null> {
    return await this.sessionClassTeacherRepository.findOne({
      where: {
        session_id: createSessionClassTeacherDto.session_id,
        class_id: createSessionClassTeacherDto.class_id,
        user_id: createSessionClassTeacherDto.user_id,
      },
    });
  }
}
