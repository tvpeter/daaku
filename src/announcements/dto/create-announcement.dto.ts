import { IsRegistered } from '@app/common/is-registered-constraint';
import { AnnouncementStatus } from '@app/common/enums';
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
