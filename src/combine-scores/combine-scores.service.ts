import { Injectable } from '@nestjs/common';
import { CreateCombineScoreDto } from './dto/create-combine-score.dto';
import { UpdateCombineScoreDto } from './dto/update-combine-score.dto';

@Injectable()
export class CombineScoresService {
  create(createCombineScoreDto: CreateCombineScoreDto) {
    return 'This action adds a new combineScore';
  }

  findAll() {
    return `This action returns all combineScores`;
  }

  findOne(id: number) {
    return `This action returns a #${id} combineScore`;
  }

  update(id: number, updateCombineScoreDto: UpdateCombineScoreDto) {
    return `This action updates a #${id} combineScore`;
  }

  remove(id: number) {
    return `This action removes a #${id} combineScore`;
  }
}
