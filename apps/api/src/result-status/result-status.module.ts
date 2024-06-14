import { Module } from '@nestjs/common';
import { ResultStatusService } from './result-status.service';
import { ResultStatusController } from './result-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultStatus } from './entities/result-status.entity';
import { CommonModule } from '@app/common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([ResultStatus]), CommonModule],
  controllers: [ResultStatusController],
  providers: [ResultStatusService],
  exports: [ResultStatusService],
})
export class ResultStatusModule {}
