import { Module } from '@nestjs/common';
import { ScoreMetaDataService } from './score-meta-data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreMetaDatum } from './entities/score-meta-datum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScoreMetaDatum])],
  providers: [ScoreMetaDataService],
})
export class ScoreMetaDataModule {}
