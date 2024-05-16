import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentclassService } from './studentclass.service';
import { CreateStudentclassDto } from './dto/create-studentclass.dto';
import { UpdateStudentclassDto } from './dto/update-studentclass.dto';

@Controller('studentclass')
export class StudentclassController {
  constructor(private readonly studentclassService: StudentclassService) {}

  @Post()
  create(@Body() createStudentclassDto: CreateStudentclassDto) {
    return this.studentclassService.create(createStudentclassDto);
  }

  @Get()
  findAll() {
    return this.studentclassService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentclassService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentclassDto: UpdateStudentclassDto,
  ) {
    return this.studentclassService.update(+id, updateStudentclassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentclassService.remove(+id);
  }
}
