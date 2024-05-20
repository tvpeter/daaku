import { Module } from '@nestjs/common';
import { TermStatusService } from './term-status.service';
import { TermStatusController } from './term-status.controller';

@Module({
  controllers: [TermStatusController],
  providers: [TermStatusService],
})
export class TermStatusModule {}
