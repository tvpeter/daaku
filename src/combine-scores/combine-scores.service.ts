import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCombineScoreDto } from './dto/create-combine-score.dto';
import { UpdateCombineScoreDto } from './dto/update-combine-score.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CombineScore } from './entities/combine-score.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CombineScoresService {
  constructor(
    @InjectRepository(CombineScore)
    private readonly combineScoreRepo: Repository<CombineScore>,
  ) {}

  async create(createCombineScoreDto: CreateCombineScoreDto) {
    const combineScore = this.combineScoreRepo.create(createCombineScoreDto);

    return await this.combineScoreRepo.save(combineScore);
  }

  async findAll() {
    return await this.combineScoreRepo.find();
  }

  async findOne(id: number) {
    const combineScore = await this.combineScoreRepo.findOne({ where: { id } });

    if (!combineScore) {
      throw new NotFoundException(
        'Combine score for student for this session not found',
      );
    }

    return combineScore;
  }

  async update(id: number, updateCombineScoreDto: UpdateCombineScoreDto) {
    const combineScore = await this.findOne(id);

    return await this.combineScoreRepo.save({
      ...combineScore,
      ...updateCombineScoreDto,
    });
  }

  async remove(id: number) {
    const combineScore = await this.findOne(id);

    return await this.combineScoreRepo.remove(combineScore);
  }
}
