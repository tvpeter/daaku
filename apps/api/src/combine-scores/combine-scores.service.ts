import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCombineScoreDto } from './dto/create-combine-score.dto';
import { UpdateCombineScoreDto } from './dto/update-combine-score.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CombineScore } from './entities/combine-score.entity';
import { Repository } from 'typeorm';
import { RegisterStudentSubject } from '@app/scores/events/register-student-subject.interface';

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

  async checkStudentDataExist(
    student_id: number,
    class_id: number,
    session_id: number,
    subject_id: number,
  ): Promise<boolean> {
    const result = await this.combineScoreRepo.findOne({
      where: {
        student_id,
        class_id,
        session_id,
        subject_id,
      },
    });

    if (result) return true;
    return false;
  }

  async registerStudents(studentData: RegisterStudentSubject[]) {
    await this.combineScoreRepo.upsert(studentData, {
      conflictPaths: [],
      skipUpdateIfNoValuesChanged: true,
    });
  }
}
