import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TermStatusService } from './term-status.service';
import { CreateTermStatusDto } from './dto/create-term-status.dto';
import { UpdateTermStatusDto } from './dto/update-term-status.dto';

@Controller('term-status')
export class TermStatusController {
  constructor(private readonly termStatusService: TermStatusService) {}

  @Post()
  create(@Body() createTermStatusDto: CreateTermStatusDto) {
    return this.termStatusService.create(createTermStatusDto);
  }

  @Get()
  findAll() {
    return this.termStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.termStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTermStatusDto: UpdateTermStatusDto) {
    return this.termStatusService.update(+id, updateTermStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.termStatusService.remove(+id);
  }
}
