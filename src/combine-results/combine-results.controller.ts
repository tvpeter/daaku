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
import { CombineResultsService } from './combine-results.service';
import { CreateCombineResultDto } from './dto/create-combine-result.dto';
import { UpdateCombineResultDto } from './dto/update-combine-result.dto';

@Controller('combine-results')
export class CombineResultsController {
  constructor(private readonly combineResultsService: CombineResultsService) {}

  @Post()
  create(@Body() createCombineResultDto: CreateCombineResultDto) {
    return this.combineResultsService.create(createCombineResultDto);
  }

  @Get()
  findAll() {
    return this.combineResultsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.combineResultsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCombineResultDto: UpdateCombineResultDto,
  ) {
    return this.combineResultsService.update(id, updateCombineResultDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.combineResultsService.remove(id);
  }
}
