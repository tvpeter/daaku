import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpException,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { StudentclassService } from './studentclass.service';
import { CreateStudentclassDto } from './dto/create-studentclass.dto';
import { UpdateStudentclassDto } from './dto/update-studentclass.dto';
import { EntityNotFoundError } from 'typeorm';

@Controller('studentclass')
export class StudentclassController {
  constructor(private readonly studentclassService: StudentclassService) {}

  @Post()
  async create(@Body() createStudentclassDto: CreateStudentclassDto) {
    return await this.studentclassService.create(createStudentclassDto);
  }

  @Get()
  async findAll() {
    return await this.studentclassService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.studentclassService.findOne(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) throw new NotFoundException();
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStudentclassDto: UpdateStudentclassDto,
  ) {
    try {
      return await this.studentclassService.update(id, updateStudentclassDto);
    } catch (error) {
      if (error instanceof EntityNotFoundError) throw new NotFoundException();
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.studentclassService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
