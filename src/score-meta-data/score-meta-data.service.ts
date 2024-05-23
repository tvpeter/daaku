import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScoreMetaDatumDto } from './dto/create-score-meta-datum.dto';
import { UpdateScoreMetaDatumDto } from './dto/update-score-meta-datum.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ScoreMetaDatum } from './entities/score-meta-datum.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ScoreMetaDataService {
  constructor(
    @InjectRepository(ScoreMetaDatum)
    private readonly scoreMetaDataRepo: Repository<ScoreMetaDatum>,
  ) {}

  async create(createScoreMetaDatumDto: CreateScoreMetaDatumDto) {
    const scoreData = this.scoreMetaDataRepo.create(createScoreMetaDatumDto);

    return await this.scoreMetaDataRepo.save(scoreData);
  }

  async findAll() {
    return this.scoreMetaDataRepo.find();
  }

  async findOne(id: number): Promise<ScoreMetaDatum | null> {
    const scoreMetaData = await this.scoreMetaDataRepo.findOne({
      where: { id },
    });
    if (!scoreMetaData)
      throw new NotFoundException('score meta data not found');
    return scoreMetaData;
  }

  async update(id: number, updateScoreMetaDatumDto: UpdateScoreMetaDatumDto) {
    const scoreMetaData = await this.findOne(id);

    return await this.scoreMetaDataRepo.save({
      ...scoreMetaData,
      ...updateScoreMetaDatumDto,
    });
  }

  async remove(id: number) {
    const scoreMetaData = await this.findOne(id);

    return await this.scoreMetaDataRepo.remove(scoreMetaData);
  }
}
