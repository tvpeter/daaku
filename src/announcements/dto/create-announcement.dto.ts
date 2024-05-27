import { IsRegistered } from '@app/shared/is-registered-constraint';
import { AnnouncementStatus } from '@app/shared/types';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateAnnouncementDto {
  @IsString()
  topic: string;

  @IsString()
  body: string;

  @IsEnum(AnnouncementStatus)
  status: AnnouncementStatus;

  @IsRegistered({ tableName: 'users', column: 'id' })
  @IsOptional()
  user_id: number;
}
