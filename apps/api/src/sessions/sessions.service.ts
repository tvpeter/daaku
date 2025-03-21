import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { Repository } from 'typeorm';
import { SessionStatus } from '@app/common/enums';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  async create(createSessionDto: CreateSessionDto) {
    const newSession = this.sessionRepository.create(createSessionDto);
    return await this.sessionRepository.save(newSession);
  }

  async findAll() {
    return await this.sessionRepository.find();
  }

  async findOne(id: number) {
    const session = await this.sessionRepository.findOne({ where: { id } });
    if (!session) throw new NotFoundException('Selected session not found');

    return session;
  }

  async update(id: number, updateSessionDto: UpdateSessionDto) {
    const session = await this.findOne(id);

    return await this.sessionRepository.save({
      ...session,
      ...updateSessionDto,
    });
  }

  async remove(id: number) {
    const session = await this.findOne(id);
    return this.sessionRepository.remove(session);
  }

  async checkSessionIsOpen(session_id: number): Promise<boolean> {
    const session = await this.findOne(session_id);

    if (session.status !== SessionStatus.OPEN) return false;

    return true;
  }
}
