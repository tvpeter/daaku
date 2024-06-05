import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityManager } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { IsUniqueConstraintInput } from './is-unique-input.type';

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  async validate(
    value: any,
    validateArgs?: ValidationArguments,
  ): Promise<boolean> {
    try {
      const { tableName, column }: IsUniqueConstraintInput =
        validateArgs.constraints[0];

      const exists = await this.entityManager
        .getRepository(tableName)
        .createQueryBuilder(tableName)
        .where({ [column]: value })
        .getExists();

      return exists ? false : true;
    } catch (error) {
      Logger.log(error);
      return false;
    }
  }

  defaultMessage?(args?: ValidationArguments): string {
    const { tableName, column } = args.constraints[0];
    return `provided ${tableName} ${column} already exist`;
  }
}

export function IsUnique(
  options: IsUniqueConstraintInput,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'is-unique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsUniqueConstraint,
    });
  };
}
