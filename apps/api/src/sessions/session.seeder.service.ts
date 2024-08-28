import { faker } from '@faker-js/faker';
import { Session } from './entities/session.entity';
import { SessionStatus } from '@app/common/enums';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractSeeder } from '@app/seeder/abstract.seeder';

export class SessionSeederService extends AbstractSeeder {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {
    super();
  }

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

  async seed(): Promise<void> {
    const count = await this.count();
    if (count > 0) return;
    const sessions = await this.generateData();
    await this.resetAutoIds();
    await Promise.all(
      sessions.map((session) => this.sessionRepository.save(session)),
    );
  }

  async sessionIds(): Promise<number[]> {
    const sessions = await this.sessionRepository.find();
    return sessions.map((session) => session.id);
  }

  async resetAutoIds() {
    const entityManager = this.sessionRepository.manager;
    await entityManager.query('ALTER TABLE session AUTO_INCREMENT=1;');
  }
}
