import { PartialType } from '@nestjs/mapped-types';
import { CreateScoreMetaDatumDto } from './create-score-meta-datum.dto';

export class UpdateScoreMetaDatumDto extends PartialType(CreateScoreMetaDatumDto) {}
