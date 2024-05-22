import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score)
    private readonly scoreRepository: Repository<Score>,
  ) {}
  async create(createScoreDto: CreateScoreDto) {
    const score = this.scoreRepository.create(createScoreDto);

    return await this.scoreRepository.save(score);
  }

  async findAll() {
    return await this.scoreRepository.find();
  }

  async findOne(id: number) {
    const score = await this.scoreRepository.findOne({ where: { id } });
    if (!score) throw new NotFoundException('Selected score not found');
    return score;
  }

  async update(id: number, updateScoreDto: UpdateScoreDto) {
    const score = await this.findOne(id);

    return await this.scoreRepository.save({
      ...score,
      ...updateScoreDto,
    });
  }

  async remove(id: number) {
    const score = await this.findOne(id);
    return this.scoreRepository.remove(score);
  }
}
