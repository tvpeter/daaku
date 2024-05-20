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
import { ResultStatusService } from './result-status.service';
import { CreateResultStatusDto } from './dto/create-result-status.dto';
import { UpdateResultStatusDto } from './dto/update-result-status.dto';

@Controller('result-status')
export class ResultStatusController {
  constructor(private readonly resultStatusService: ResultStatusService) {}

  @Post()
  create(@Body() createTermStatusDto: CreateResultStatusDto) {
    return this.resultStatusService.create(createTermStatusDto);
  }

  @Get()
  findAll() {
    return this.resultStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.resultStatusService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateResultStatusDto: UpdateResultStatusDto,
  ) {
    return this.resultStatusService.update(id, updateResultStatusDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.resultStatusService.remove(id);
  }
}
