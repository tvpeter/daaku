import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { ScoresService } from './scores.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { RegisterSubjectDTO } from './dto/register-subject.dto';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  //register students in a class to a subject
  @Post('registersc')
  @HttpCode(200)
  registerSubject(@Body() registerSubjectDto: RegisterSubjectDTO) {
    return this.scoresService.registerClassSubject(registerSubjectDto);
  }

  @Post()
  create(@Body() createScoreDto: CreateScoreDto) {
    return this.scoresService.create(createScoreDto);
  }

  @Get()
  findAll() {
    return this.scoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.scoresService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateScoreDto: UpdateScoreDto,
  ) {
    return this.scoresService.update(id, updateScoreDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.scoresService.remove(id);
  }
}
