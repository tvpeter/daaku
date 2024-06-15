import { PartialType } from '@nestjs/mapped-types';
import { CreateCombineScoreDto } from './create-combine-score.dto';

export class UpdateCombineScoreDto extends PartialType(CreateCombineScoreDto) {}
