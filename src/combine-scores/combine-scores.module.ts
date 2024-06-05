import { Module } from '@nestjs/common';
import { CombineScoresService } from './combine-scores.service';
import { CombineScoresController } from './combine-scores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CombineScore } from './entities/combine-score.entity';
import { CommonModule } from '@app/common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([CombineScore]), CommonModule],
  controllers: [CombineScoresController],
  providers: [CombineScoresService],
})
export class CombineScoresModule {}
