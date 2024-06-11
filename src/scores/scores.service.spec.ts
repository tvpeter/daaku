import { Test, TestingModule } from '@nestjs/testing';
import { ScoresService } from './scores.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import { ResultStatusService } from '@app/result-status/result-status.service';
import { StudentsService } from '@app/students/students.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('ScoresService', () => {
  let service: ScoresService;

  const mockScoresRepository = {};
  const mockResultStatusService = {};
  const mockStudentService = {};
  const eventEmitter = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScoresService,
        ResultStatusService,
        {
          provide: getRepositoryToken(Score),
          useValue: mockScoresRepository,
        },
        {
          provide: EventEmitter2,
          useValue: eventEmitter,
        },
        {
          provide: ResultStatusService,
          useValue: mockResultStatusService,
        },
        {
          provide: StudentsService,
          useValue: mockStudentService,
        },
      ],
    }).compile();

    service = module.get<ScoresService>(ScoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
