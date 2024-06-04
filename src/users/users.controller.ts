import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '@app/auth/roles.decorator';
import { Role } from '@app/shared/enums';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Request() req, @Param('id', ParseIntPipe) id: number) {
    this.checkUser(req, id);
    return this.usersService.findUser(id);
  }

  @Patch(':id')
  update(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    this.checkUser(req, id);
    if (
      req.user.role !== Role.ADMIN &&
      updateUserDto.role &&
      req.user.role !== updateUserDto.role
    ) {
      throw new ForbiddenException("Only admins can change user's role");
    }
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  private checkUser(req: any, id: number) {
    if (
      req.user &&
      Number(req.user.userId) !== id &&
      req.user.role !== Role.ADMIN
    ) {
      throw new ForbiddenException(
        "You do not have permission to this user's profile",
      );
    }
  }
}
