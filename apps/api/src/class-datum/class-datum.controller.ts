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
import { ClassDatumService } from './class-datum.service';
import { CreateClassDatumDto } from './dto/create-class-datum.dto';
import { UpdateClassDatumDto } from './dto/update-class-datum.dto';

@Controller('class-datum')
export class ClassDatumController {
  constructor(private readonly classDatumService: ClassDatumService) {}

  @Post()
  create(@Body() createClassDatumDto: CreateClassDatumDto) {
    return this.classDatumService.create(createClassDatumDto);
  }

  @Get()
  findAll() {
    return this.classDatumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.classDatumService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClassDatumDto: UpdateClassDatumDto,
  ) {
    return this.classDatumService.update(id, updateClassDatumDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.classDatumService.remove(id);
  }
}
