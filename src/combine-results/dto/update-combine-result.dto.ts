import { PartialType } from '@nestjs/mapped-types';
import { CreateCombineResultDto } from './create-combine-result.dto';

export class UpdateCombineResultDto extends PartialType(CreateCombineResultDto) {}
