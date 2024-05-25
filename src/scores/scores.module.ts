import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import { ResultStatusModule } from '@app/result-status/result-status.module';

@Module({
  imports: [TypeOrmModule.forFeature([Score]), ResultStatusModule],
  controllers: [ScoresController],
  providers: [ScoresService],
})
export class ScoresModule {}
