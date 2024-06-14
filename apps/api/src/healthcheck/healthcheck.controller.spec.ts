import { Test, TestingModule } from '@nestjs/testing';
import { HealthcheckController } from './healthcheck.controller';
import { MockEntityManager } from '@app/common/utils/entity-manager.mock';
import { EntityManager } from 'typeorm';

describe('HealthcheckController', () => {
  let controller: HealthcheckController;
  let mockEntityManager: MockEntityManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthcheckController],
      providers: [
        {
          provide: EntityManager,
          useClass: MockEntityManager,
        },
      ],
    }).compile();

    controller = module.get<HealthcheckController>(HealthcheckController);
    mockEntityManager = module.get<MockEntityManager>(EntityManager);
  });

  it('should return status "ok" when database connection is successful', async () => {
    const result = await controller.getStatus();
    expect(result).toMatchObject({
      status: 'ok',
      database: 'connected',
      version: '1.0.0',
    });
  });

  it('should return status "error" when database connection fails', async () => {
    jest.spyOn(mockEntityManager, 'query').mockImplementation(() => {
      throw new Error('Connection failed');
    });

    const result = await controller.getStatus();
    expect(result).toMatchObject({
      status: 'ok',
      database: 'disconnected',
      version: '1.0.0',
    });
  });
});
