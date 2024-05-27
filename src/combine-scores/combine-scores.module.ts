import { Module } from '@nestjs/common';
import { CombineScoresService } from './combine-scores.service';
import { CombineScoresController } from './combine-scores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CombineScore } from './entities/combine-score.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CombineScore])],
  controllers: [CombineScoresController],
  providers: [CombineScoresService],
})
export class CombineScoresModule {}
