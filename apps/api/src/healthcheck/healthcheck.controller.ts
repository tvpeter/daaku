import { Public } from '@app/auth/is-public';
import { Controller, Get, Inject } from '@nestjs/common';
import * as os from 'os';
import { EntityManager } from 'typeorm';

@Controller('healthcheck')
export class HealthcheckController {
  constructor(
    @Inject(EntityManager)
    private readonly entityManager: EntityManager,
  ) {}

  @Public()
  @Get()
  async getStatus() {
    const dbStatus = await this.checkDatabaseConnection();

    return {
      status: 'ok',
      version: '1.0.0',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      database: dbStatus,
      memoryUsage: process.memoryUsage(),
      hostname: os.hostname(),
    };
  }

  async checkDatabaseConnection() {
    try {
      await this.entityManager.query('SELECT 1');
      return 'connected';
    } catch (error) {
      return 'disconnected';
    }
  }
}
