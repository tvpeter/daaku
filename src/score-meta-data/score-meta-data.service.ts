import { Injectable } from '@nestjs/common';
import { CreateScoreMetaDatumDto } from './dto/create-score-meta-datum.dto';
import { UpdateScoreMetaDatumDto } from './dto/update-score-meta-datum.dto';

@Injectable()
export class ScoreMetaDataService {
  create(createScoreMetaDatumDto: CreateScoreMetaDatumDto) {
    return 'This action adds a new scoreMetaDatum';
  }

  findAll() {
    return `This action returns all scoreMetaData`;
  }

  findOne(id: number) {
    return `This action returns a #${id} scoreMetaDatum`;
  }

  update(id: number, updateScoreMetaDatumDto: UpdateScoreMetaDatumDto) {
    return `This action updates a #${id} scoreMetaDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} scoreMetaDatum`;
  }
}
