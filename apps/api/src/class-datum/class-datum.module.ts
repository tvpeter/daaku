import { Module } from '@nestjs/common';
import { ClassDatumService } from './class-datum.service';
import { ClassDatumController } from './class-datum.controller';

@Module({
  controllers: [ClassDatumController],
  providers: [ClassDatumService],
})
export class ClassDatumModule {}
