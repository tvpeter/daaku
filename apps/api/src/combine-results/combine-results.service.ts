import { Injectable } from '@nestjs/common';
import { CreateCombineResultDto } from './dto/create-combine-result.dto';
import { UpdateCombineResultDto } from './dto/update-combine-result.dto';

@Injectable()
export class CombineResultsService {
  create(createCombineResultDto: CreateCombineResultDto) {
    
    return 'This action adds a new combineResult';
  }

  findAll() {
    return `This action returns all combineResults`;
  }

  findOne(id: number) {
    return `This action returns a #${id} combineResult`;
  }

  update(id: number, updateCombineResultDto: UpdateCombineResultDto) {
    return `This action updates a #${id} combineResult`;
  }

  remove(id: number) {
    return `This action removes a #${id} combineResult`;
  }
}
