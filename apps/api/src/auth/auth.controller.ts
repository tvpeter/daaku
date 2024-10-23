import {
  Controller,
  Request,
  Post,
  UseGuards,
  HttpCode,
  Res,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from './is-public';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Request() req, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user, response);
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Request() req): Promise<any> {
    const token = req.headers.authorization.split(' ')[1];
    await this.authService.blacklistToken(token);
    return { message: 'Logged out successfully' };
  }
}
