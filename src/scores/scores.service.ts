import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import { Repository } from 'typeorm';
import { ResultStatusService } from '@app/result-status/result-status.service';
import { ResultStatusEnum } from '@app/common/enums';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score)
    private readonly scoreRepository: Repository<Score>,
    private readonly resultStatusService: ResultStatusService,
  ) {}
  async create(createScoreDto: CreateScoreDto) {
    const score = this.scoreRepository.create(createScoreDto);
    score.total = this.calculateStudentTotalScore(createScoreDto);

    await this.checkScoreExist(createScoreDto);
    await this.checkTermResultStatus(createScoreDto);

    const newScore = await this.scoreRepository.save(score);

    // TODO: send newScore to an eventListener that will handle assigning positions to students

    return newScore;
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

    const total = this.updateStudentTotalScore(updateScoreDto, score);
    if (total > 100) {
      throw new HttpException(
        'Total cannot exceed 100',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    await this.checkTermResultStatus(score);

    return await this.scoreRepository.save({
      ...score,
      ...updateScoreDto,
      total,
    });
  }

  async remove(id: number) {
    const score = await this.findOne(id);
    return this.scoreRepository.remove(score);
  }

  async scoreExists(score: CreateScoreDto) {
    const { term, student_id, class_id, session_id, subject_id } = score;
    return await this.scoreRepository.findOne({
      where: {
        term,
        student_id,
        class_id,
        session_id,
        subject_id,
      },
    });
  }

  calculateStudentTotalScore(score: CreateScoreDto) {
    const { test, exam } = score;
    if (test && exam) return Number(test) + Number(exam);
    if (test && exam == null) return Number(test);
    return Number(exam);
  }

  updateStudentTotalScore(score: UpdateScoreDto, existingScore: Score) {
    const { exam, test } = score;
    const { test: existingTest, exam: existingExam } = existingScore;
    if (test && exam) return Number(test) + Number(exam);
    if (test && exam == null) return Number(test) + Number(existingExam);
    return Number(exam) + Number(existingTest);
  }

  private async checkScoreExist(createScoreDto: CreateScoreDto) {
    const score = await this.scoreExists(createScoreDto);
    if (score) {
      throw new HttpException(
        'Given subject score exists for the student for selected term and session',
        HttpStatus.PRECONDITION_FAILED,
      );
    }
  }

  private async checkTermResultStatus({ term, session_id, class_id }) {
    const checkResultStatus = await this.resultStatusService.checkResultStatus(
      term,
      session_id,
      class_id,
    );

    if (
      checkResultStatus &&
      checkResultStatus.result_status === ResultStatusEnum.APPROVED
    ) {
      throw new HttpException(
        'Results for the selected term has been approved and can no longer be edited',
        HttpStatus.PRECONDITION_FAILED,
      );
    }
  }
}
