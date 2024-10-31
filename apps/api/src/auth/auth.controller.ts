import {
  Controller,
  Post,
  UseGuards,
  HttpCode,
  Res,
  Request,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from './decorators/is-public';
import { Response } from 'express';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtPayload } from '@app/common/interfaces/jwt.interface';
import { User } from '@app/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(user, response);
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Request() req): Promise<any> {
    // const token = req.headers.authorization.split(' ')[1];
    const token = req.cookies?.Authentication;
    await this.authService.blacklistToken(token);
    return { message: 'Logged out successfully' };
  }

  @Public()
  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  @HttpCode(200)
  async refreshToken(
    @CurrentUser() user: JwtPayload,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.login(user, response);
  }
}
