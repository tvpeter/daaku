import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSource from 'db/data-source';

@Module({
  imports: [TypeOrmModule.forRootAsync(dataSource)],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
