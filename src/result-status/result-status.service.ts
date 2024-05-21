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

@Injectable()
export class ResultStatusService {
  constructor(
    @InjectRepository(ResultStatus)
    private readonly resultRepository: Repository<ResultStatus>,
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
    const resultStatus = this.resultRepository.create(createResultStatusDto);
    return await this.resultRepository.save(resultStatus);
  }

  async findAll() {
    return await this.resultRepository.find();
  }

  async findOne(id: number) {
    const resultStatus = await this.resultRepository.findOne({ where: { id } });

    if (!resultStatus) throw new NotFoundException('Result status not found');
    return resultStatus;
  }

  async update(id: number, updateResultStatusDto: UpdateResultStatusDto) {
    const resultStatus = await this.findOne(id);

    return await this.resultRepository.save({
      ...resultStatus,
      ...updateResultStatusDto,
    });
  }

  async remove(id: number) {
    const resultStatus = await this.findOne(id);

    return this.resultRepository.remove(resultStatus);
  }

  async findBySessionAndClassAndTerm(
    createResultStatusDto: CreateResultStatusDto,
  ): Promise<ResultStatus | null> {
    const { term, sessionId, classId } = createResultStatusDto;
    return await this.resultRepository.findOne({
      where: {
        term,
        classId,
        sessionId,
      },
    });
  }
}
