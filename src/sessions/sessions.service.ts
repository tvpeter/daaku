import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { Repository } from 'typeorm';

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
    return await this.sessionRepository.findOne({ where: { id } });
  }

  async update(id: number, updateSessionDto: UpdateSessionDto) {
    const session = await this.sessionRepository.findOne({ where: { id } });

    if (!session) throw new NotFoundException('Selected session is not found');

    return await this.sessionRepository.save({
      ...session,
      ...updateSessionDto,
    });
  }

  async remove(id: number) {
    const session = await this.sessionRepository.findOne({
      where: { id },
    });
    if (!session) throw new NotFoundException('Given class not found');
    return this.sessionRepository.remove(session);
  }
}
