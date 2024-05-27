import { IsRegistered } from '@app/shared/is-registered-constraint';
import { IsOptional, IsString } from 'class-validator';

export class CreateAnnouncementDto {
  @IsString()
  topic: string;

  @IsString()
  body: string;

  @IsRegistered({ tableName: 'users', column: 'id' })
  @IsOptional()
  user_id: number;
}
