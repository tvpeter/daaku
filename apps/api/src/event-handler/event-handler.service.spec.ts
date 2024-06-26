import { Test, TestingModule } from '@nestjs/testing';
import { EventHandlerService } from './event-handler.service';
import { ScoresService } from '@app/scores/scores.service';
import { StudentSessionClassService } from '@app/student-session-class/student-session-class.service';
import { CombineScoresService } from '@app/combine-scores/combine-scores.service';

describe('EventHandlerService', () => {
  let service: EventHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventHandlerService,
        {
          provide: ScoresService,
          useValue: {},
        },
        {
          provide: StudentSessionClassService,
          useValue: {},
        },
        {
          provide: CombineScoresService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<EventHandlerService>(EventHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
