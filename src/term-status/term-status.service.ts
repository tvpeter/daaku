import { Injectable } from '@nestjs/common';
import { CreateTermStatusDto } from './dto/create-term-status.dto';
import { UpdateTermStatusDto } from './dto/update-term-status.dto';

@Injectable()
export class TermStatusService {
  create(createTermStatusDto: CreateTermStatusDto) {
    return 'This action adds a new termStatus';
  }

  findAll() {
    return `This action returns all termStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} termStatus`;
  }

  update(id: number, updateTermStatusDto: UpdateTermStatusDto) {
    return `This action updates a #${id} termStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} termStatus`;
  }
}
