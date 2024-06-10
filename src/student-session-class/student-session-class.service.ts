import { Injectable } from '@nestjs/common';
import { CreateStudentSessionClassDto } from './dto/create-student-session-class.dto';
import { UpdateStudentSessionClassDto } from './dto/update-student-session-class.dto';

@Injectable()
export class StudentSessionClassService {
  create(createStudentSessionClassDto: CreateStudentSessionClassDto) {
    return 'This action adds a new studentSessionClass';
  }

  findAll() {
    return `This action returns all studentSessionClass`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentSessionClass`;
  }

  update(id: number, updateStudentSessionClassDto: UpdateStudentSessionClassDto) {
    return `This action updates a #${id} studentSessionClass`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentSessionClass`;
  }
}
