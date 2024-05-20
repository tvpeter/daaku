import { Injectable } from '@nestjs/common';
import { CreateResultStatusDto } from './dto/create-result-status.dto';
import { UpdateResultStatusDto } from './dto/update-result-status.dto';

@Injectable()
export class ResultStatusService {
  create(_createResultStatusDto: CreateResultStatusDto) {
    return 'This action adds a new termStatus';
  }

  findAll() {
    return `This action returns all termStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} termStatus`;
  }

  update(id: number, _updateResultStatusDto: UpdateResultStatusDto) {
    return `This action updates a #${id} termStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} termStatus`;
  }
}
