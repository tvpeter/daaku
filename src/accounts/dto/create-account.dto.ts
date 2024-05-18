import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { IsRegistered } from 'src/shared/is-registered-constraint';
import { AccountStatus, Banks } from 'src/shared/types';
import { User } from 'src/users/entities/user.entity';

export class CreateAccountDto {
  @IsEnum(Banks)
  bank: Banks;

  @IsNotEmpty()
  @IsString()
  account_name: string;

  @IsNotEmpty()
  @IsNumber()
  @Length(10, 10)
  account_number: number;

  @IsOptional()
  @IsEnum(AccountStatus)
  status: AccountStatus;

  @IsRegistered({ tableName: 'user', column: 'id' })
  user_id: User;
}
