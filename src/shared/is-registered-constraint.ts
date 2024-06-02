import { Injectable, Logger } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityManager } from 'typeorm';
import { IsUniqueConstraintInput } from './enums';

@ValidatorConstraint({ name: 'IsRegisteredConstraint', async: true })
@Injectable()
export class IsRegisteredConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    try {
      const { tableName, column }: IsUniqueConstraintInput =
        validationArguments.constraints[0];

      const exists = await this.entityManager
        .getRepository(tableName)
        .createQueryBuilder(tableName)
        .where({ [column]: value })
        .getExists();
      return exists ? true : false;
    } catch (error) {
      Logger.log(error);
      return false;
    }
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    const { tableName, column }: IsUniqueConstraintInput =
      validationArguments.constraints[0];
    return `selected ${tableName} ${column} does not exist`;
  }
}

export function IsRegistered(
  options: IsUniqueConstraintInput,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'is-registered',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsRegisteredConstraint,
    });
  };
}
