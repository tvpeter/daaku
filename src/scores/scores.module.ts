import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import { ResultStatusModule } from '@app/result-status/result-status.module';
import { SessionsModule } from '@app/sessions/sessions.module';
import { Session } from '@app/sessions/entities/session.entity';
import { CommonModule } from '@app/common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Score]),
    ResultStatusModule,
    SessionsModule,
    TypeOrmModule.forFeature([Session]),
    CommonModule,
  ],
  controllers: [ScoresController],
  providers: [ScoresService],
})
export class ScoresModule {}
