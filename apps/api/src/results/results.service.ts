import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { SchoolTerm } from '@app/common/enums';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
  ) {}

  create(createResultDto: CreateResultDto) {
    return 'This action adds a new result';
  }

  async findAll(
    class_id: number,
    session_id: number,
    term: SchoolTerm,
  ): Promise<Result[] | []> {
    return await this.resultRepository.find({
      where: {
        class_id,
        session_id,
        term,
      },
    });
  }

  async findOne(
    student_id: number,
    class_id: number,
    session_id: number,
    term: SchoolTerm,
  ): Promise<Result | null> {
    const result = await this.resultRepository.findOne({
      where: {
        student_id,
        class_id,
        session_id,
        term,
      },
    });

    if (!result)
      throw new NotFoundException('Selected student result was not found');

    return result;
  }

  update(id: number, updateResultDto: UpdateResultDto) {
    return `This action updates a #${id} result`;
  }

  remove(id: number) {
    return `This action removes a #${id} result`;
  }
}
