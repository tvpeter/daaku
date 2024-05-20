import { PartialType } from '@nestjs/mapped-types';
import { CreateTermStatusDto } from './create-term-status.dto';

export class UpdateTermStatusDto extends PartialType(CreateTermStatusDto) {}
