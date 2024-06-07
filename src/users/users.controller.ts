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
import { UserRole } from '@app/common/enums';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  myProfile(@Request() req) {
    const user = req.user;
    return this.usersService.findUser(Number(user.userId));
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
      req.user.role !== UserRole.ADMIN &&
      updateUserDto.role &&
      req.user.role !== updateUserDto.role
    ) {
      throw new ForbiddenException("Only admins can change user's role");
    }
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  private checkUser(req: any, id: number) {
    if (
      req.user &&
      Number(req.user.userId) !== id &&
      req.user.role !== UserRole.ADMIN
    ) {
      throw new ForbiddenException(
        "You do not have permission to this user's profile",
      );
    }
  }
}
