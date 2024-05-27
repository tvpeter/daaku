import { Module } from '@nestjs/common';
import { CombineScoresService } from './combine-scores.service';
import { CombineScoresController } from './combine-scores.controller';

@Module({
  controllers: [CombineScoresController],
  providers: [CombineScoresService],
})
export class CombineScoresModule {}
