import { Module } from '@nestjs/common';
import { ResultStatusService } from './result-status.service';
import { ResultStatusController } from './result-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultStatus } from './entities/result-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResultStatus])],
  controllers: [ResultStatusController],
  providers: [ResultStatusService],
})
export class ResultStatusModule {}
