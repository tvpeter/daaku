import { Module } from '@nestjs/common';
import { ScoreMetaDataService } from './score-meta-data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreMetaDatum } from './entities/score-meta-datum.entity';
import { Studentclass } from '@app/studentclass/entities/studentclass.entity';
import { Subject } from '@app/subjects/entities/subject.entity';
import { Session } from '@app/sessions/entities/session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScoreMetaDatum, Studentclass, Subject, Session]),
  ],
  providers: [ScoreMetaDataService],
  exports: [TypeOrmModule.forFeature([ScoreMetaDatum])],
})
export class ScoreMetaDataModule {}
