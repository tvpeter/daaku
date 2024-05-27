import { Module } from '@nestjs/common';
import { CombineResultsService } from './combine-results.service';
import { CombineResultsController } from './combine-results.controller';

@Module({
  controllers: [CombineResultsController],
  providers: [CombineResultsService],
})
export class CombineResultsModule {}
