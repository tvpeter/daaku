import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateResultStatusDto } from './dto/create-result-status.dto';
import { UpdateResultStatusDto } from './dto/update-result-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultStatus } from './entities/result-status.entity';
import { Repository } from 'typeorm';
import { SchoolTerm } from '@app/shared/types';

@Injectable()
export class ResultStatusService {
  constructor(
    @InjectRepository(ResultStatus)
    private readonly resultStatusRepository: Repository<ResultStatus>,
  ) {}
  async create(createResultStatusDto: CreateResultStatusDto) {
    const existingResultStatus = await this.findBySessionAndClassAndTerm(
      createResultStatusDto,
    );
    if (existingResultStatus) {
      throw new HttpException(
        'Result status for given term, session and class already exist',
        HttpStatus.PRECONDITION_FAILED,
      );
    }
    const resultStatus = this.resultStatusRepository.create(
      createResultStatusDto,
    );
    return await this.resultStatusRepository.save(resultStatus);
  }

  async findAll() {
    return await this.resultStatusRepository.find();
  }

  async findOne(id: number) {
    const resultStatus = await this.resultStatusRepository.findOne({
      where: { id },
    });

    if (!resultStatus) throw new NotFoundException('Result status not found');
    return resultStatus;
  }

  async update(id: number, updateResultStatusDto: UpdateResultStatusDto) {
    const resultStatus = await this.findOne(id);

    return await this.resultStatusRepository.save({
      ...resultStatus,
      ...updateResultStatusDto,
    });
  }

  async remove(id: number) {
    const resultStatus = await this.findOne(id);

    return this.resultStatusRepository.remove(resultStatus);
  }

  async findBySessionAndClassAndTerm(
    createResultStatusDto: CreateResultStatusDto,
  ): Promise<ResultStatus | null> {
    const { term, session_id, class_id } = createResultStatusDto;
    return await this.resultStatusRepository.findOne({
      where: {
        term,
        class_id,
        session_id,
      },
    });
  }

  async checkResultStatus(
    term: SchoolTerm,
    session_id: number,
    class_id: number,
  ): Promise<Partial<ResultStatus> | null> {
    return this.resultStatusRepository.findOne({
      where: {
        session_id,
        term,
        class_id,
      },
      select: {
        result_status: true,
      },
    });
  }
}
