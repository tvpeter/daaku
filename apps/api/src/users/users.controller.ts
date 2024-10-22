import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '@app/auth/decorators/roles.decorator';
import { UserRole } from '@app/common/enums';
import { User } from '@app/auth/decorators/user.decorator';
import { JwtPayload } from '@app/common/interfaces/jwt.interface';

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
  myProfile(@User() user: JwtPayload) {
    return this.usersService.findUser(Number(user.userId));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @User() user: JwtPayload) {
    this.checkUser(user, id);
    return this.usersService.findUser(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @User() user: JwtPayload,
  ) {
    this.checkUser(user, id);
    if (
      user.role !== UserRole.ADMIN &&
      updateUserDto.role &&
      user.role !== updateUserDto.role
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

  private checkUser(user: JwtPayload, id: number) {
    if (user && Number(user.userId) !== id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException(
        "You do not have permission to this user's profile",
      );
    }
  }
}
