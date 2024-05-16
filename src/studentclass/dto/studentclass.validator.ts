import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { StudentclassService } from '../studentclass.service';
import { Injectable, Logger } from '@nestjs/common';

@ValidatorConstraint({ name: 'StudentClassValidator', async: true })
@Injectable()
export class StudentClassValidator implements ValidatorConstraintInterface {
  constructor(private readonly studentClassService: StudentclassService) {}

  async validate(name: string): Promise<boolean> {
    const studentClassExists = await this.studentClassService.findByName(name);
    if (studentClassExists) return false;
    return true;
  }

  defaultMessage(): string {
    return 'class name already exist';
  }
}
