import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CombineScoresService } from './combine-scores.service';
import { CreateCombineScoreDto } from './dto/create-combine-score.dto';
import { UpdateCombineScoreDto } from './dto/update-combine-score.dto';

@Controller('combine-scores')
export class CombineScoresController {
  constructor(private readonly combineScoresService: CombineScoresService) {}

  @Post()
  create(@Body() createCombineScoreDto: CreateCombineScoreDto) {
    return this.combineScoresService.create(createCombineScoreDto);
  }

  @Get()
  findAll() {
    return this.combineScoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.combineScoresService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCombineScoreDto: UpdateCombineScoreDto,
  ) {
    return this.combineScoresService.update(id, updateCombineScoreDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.combineScoresService.remove(id);
  }
}
