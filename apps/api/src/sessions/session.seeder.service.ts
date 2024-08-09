import { faker } from '@faker-js/faker';
import { Session } from './entities/session.entity';
import { SessionStatus } from '@app/common/enums';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class SessionSeederService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  async generateData(): Promise<Session[]> {
    const sessions = [];

    for (let i = 0; i < 15; i++) {
      const session = new Session();
      const year = new Date().getFullYear();
      session.name = year + '/' + (year + 1);
      session.status = faker.helpers.enumValue(SessionStatus);
      sessions.push(session);
    }

    return sessions;
  }

  async count(): Promise<number> {
    return await this.sessionRepository.count();
  }

  async seedData(): Promise<void> {
    const sessions = await this.generateData();
    await Promise.all(
      sessions.map((session) => this.sessionRepository.save(session)),
    );
  }

  async sessionIds(): Promise<number[]> {
    const sessions = await this.sessionRepository.find();
    return sessions.map((session) => session.id);
  }
}
