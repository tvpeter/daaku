import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import { ResultStatusModule } from '@app/result-status/result-status.module';
import { SessionsModule } from '@app/sessions/sessions.module';
import { CommonModule } from '@app/common/common.module';
import { StudentsModule } from '@app/students/students.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Score]),
    ResultStatusModule,
    SessionsModule,
    CommonModule,
    StudentsModule,
  ],
  controllers: [ScoresController],
  providers: [ScoresService],
})
export class ScoresModule {}
