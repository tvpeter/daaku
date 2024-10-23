import { User } from '@app/users/entities/user.entity';
import { UsersService } from '@app/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from '../common/interfaces/jwt.interface';
import { UserStatus } from '@app/common/enums';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private blacklistedTokens: string[] = [];

  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Partial<User> | null> {
    try {
      const user = await this.userService.findByUsername(username);

      if (user && user.status === UserStatus.ACTIVE) {
        const check = await bcrypt.compare(password, user.password);
        if (check) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, ...rest } = user;
          return rest;
        }
      }
      throw new UnauthorizedException();
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async login(user: Partial<User>, response: Response) {
    const payload = {
      username: user.username,
      userId: user.id,
      status: user.status,
      role: user.role,
    };

    const expiresAccessToken = new Date();
    expiresAccessToken.setMilliseconds(
      expiresAccessToken.getTime() +
        parseInt(
          this.configService.getOrThrow<string>('JWT_TOKEN_EXPIRATION_MS'),
        ),
    );

    const access_token = this.jwtService.sign(payload);

    response.cookie('Authentication', access_token, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires: expiresAccessToken,
    });

    return {
      message: 'Login successful',
    };
  }

  async validateUserByJwt(payload: JwtPayload): Promise<JwtPayload> {
    return {
      userId: payload.userId,
      username: payload.username,
      role: payload.role,
    };
  }

  async blacklistToken(token: string): Promise<void> {
    this.blacklistedTokens.push(token);
  }

  isTokenBlacklisted(token: string): boolean {
    return this.blacklistedTokens.includes(token);
  }

  getBlacklistedTokens(): string[] {
    return this.blacklistedTokens;
  }
}
