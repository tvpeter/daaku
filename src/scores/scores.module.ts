import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import { ResultStatusModule } from '@app/result-status/result-status.module';
import { SessionsModule } from '@app/sessions/sessions.module';
import { Session } from '@app/sessions/entities/session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Score]),
    ResultStatusModule,
    SessionsModule,
    TypeOrmModule.forFeature([Session]),
  ],
  controllers: [ScoresController],
  providers: [
    ScoresService,
    {
      provide: getRepositoryToken(Score),
      useValue: 'mockRepository',
    },
  ],
})
export class ScoresModule {}
