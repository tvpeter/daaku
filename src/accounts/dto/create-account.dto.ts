import { Banks, AccountStatus } from '@app/common/enums';
import { IsRegistered } from '@app/common/validators/is-registered-constraint';
import { IsUnique } from '@app/common/validators/is-unique-constraint';
import { User } from '@app/users/entities/user.entity';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

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
