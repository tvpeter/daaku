import { Module } from '@nestjs/common';
import { EventHandlerService } from './event-handler.service';
import { ScoresModule } from '@app/scores/scores.module';
import { StudentSessionClassModule } from '@app/student-session-class/student-session-class.module';

@Module({
  imports: [ScoresModule, StudentSessionClassModule],
  providers: [EventHandlerService],
})
export class EventHandlerModule {}
