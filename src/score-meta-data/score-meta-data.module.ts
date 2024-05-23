import { Module } from '@nestjs/common';
import { ScoreMetaDataService } from './score-meta-data.service';
import { ScoreMetaDataController } from './score-meta-data.controller';

@Module({
  controllers: [ScoreMetaDataController],
  providers: [ScoreMetaDataService],
})
export class ScoreMetaDataModule {}
