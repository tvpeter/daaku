import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { IsRegistered } from 'src/shared/is-registered-constraint';
import { IsUnique } from 'src/shared/is-unique-constraint';
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
  @Min(1000000)
  @Max(9999999999)
  @IsUnique({ tableName: 'account', column: 'account_number' })
  account_number: number;

  @IsOptional()
  @IsEnum(AccountStatus)
  status: AccountStatus;

  @IsRegistered({ tableName: 'users', column: 'id' })
  user_id: User;
}
