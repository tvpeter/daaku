import { Injectable } from '@nestjs/common';
import { CreateStudentclassDto } from './dto/create-studentclass.dto';
import { UpdateStudentclassDto } from './dto/update-studentclass.dto';

@Injectable()
export class StudentclassService {
  create(createStudentclassDto: CreateStudentclassDto) {
    return 'This action adds a new studentclass';
  }

  findAll() {
    return `This action returns all studentclass`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentclass`;
  }

  update(id: number, updateStudentclassDto: UpdateStudentclassDto) {
    return `This action updates a #${id} studentclass`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentclass`;
  }
}
