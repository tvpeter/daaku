import { Module } from '@nestjs/common';
import { ClassDatumService } from './class-datum.service';
import { ClassDatumController } from './class-datum.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassDatum } from './entities/class-datum.entity';

@Module({
  controllers: [ClassDatumController],
  providers: [ClassDatumService],
  imports: [TypeOrmModule.forFeature([ClassDatum])],
})
export class ClassDatumModule {}
