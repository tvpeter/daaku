import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { CommonModule } from '@app/common/common.module';
import { SubjectsSeederService } from './subjects.seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subject]), CommonModule],
  controllers: [SubjectsController],
  providers: [SubjectsService, SubjectsSeederService],
  exports: [SubjectsSeederService],
})
export class SubjectsModule {}
