import { Module } from '@nestjs/common';
import { IsRegisteredConstraint } from './validators/is-registered-constraint';
import { IsUniqueConstraint } from './validators/is-unique-constraint';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [IsRegisteredConstraint, IsUniqueConstraint],
  exports: [IsRegisteredConstraint, IsUniqueConstraint],
})
export class CommonModule {}
