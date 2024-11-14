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
import { SessionClassTeacherService } from './session-class-teacher.service';
import { CreateSessionClassTeacherDto } from './dto/create-session-class-teacher.dto';
import { UpdateSessionClassTeacherDto } from './dto/update-session-class-teacher.dto';

@Controller('sessionclassteacher')
export class SessionClassTeacherController {
  constructor(
    private readonly sessionClassTeacherService: SessionClassTeacherService,
  ) {}

  @Post()
  create(@Body() createSessionClassTeacherDto: CreateSessionClassTeacherDto) {
    return this.sessionClassTeacherService.create(createSessionClassTeacherDto);
  }

  @Get()
  findAll() {
    return this.sessionClassTeacherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sessionClassTeacherService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSessionClassTeacherDto: UpdateSessionClassTeacherDto,
  ) {
    return this.sessionClassTeacherService.update(
      id,
      updateSessionClassTeacherDto,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sessionClassTeacherService.remove(id);
  }
}
