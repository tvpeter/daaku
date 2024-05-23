import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScoreMetaDataService } from './score-meta-data.service';
import { CreateScoreMetaDatumDto } from './dto/create-score-meta-datum.dto';
import { UpdateScoreMetaDatumDto } from './dto/update-score-meta-datum.dto';

@Controller('score-meta-data')
export class ScoreMetaDataController {
  constructor(private readonly scoreMetaDataService: ScoreMetaDataService) {}

  @Post()
  create(@Body() createScoreMetaDatumDto: CreateScoreMetaDatumDto) {
    return this.scoreMetaDataService.create(createScoreMetaDatumDto);
  }

  @Get()
  findAll() {
    return this.scoreMetaDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scoreMetaDataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScoreMetaDatumDto: UpdateScoreMetaDatumDto) {
    return this.scoreMetaDataService.update(+id, updateScoreMetaDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scoreMetaDataService.remove(+id);
  }
}
