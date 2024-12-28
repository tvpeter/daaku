import { PartialType } from '@nestjs/mapped-types';
import { CreateClassDatumDto } from './create-class-datum.dto';

export class UpdateClassDatumDto extends PartialType(CreateClassDatumDto) {}
