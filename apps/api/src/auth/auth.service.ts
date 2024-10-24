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

    const expiresAccessToken = this.getExpiresAccessToken();
    const expiresRefreshToken = this.getExpiresRefreshToken();

    const access_token = this.jwtService.sign(payload);

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.getOrThrow(
        'JWT_REFRESH_EXPIRATION_MS',
      )}ms`,
    });

    const hashedRefreshToken =
      await this.userService.hashPassword(refreshToken);

    await this.userService.update(user.id, { token: hashedRefreshToken });

    response.cookie('Authentication', access_token, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires: expiresAccessToken,
    });

    response.cookie('Refresh', refreshToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires: expiresRefreshToken,
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

  private getExpiresAccessToken(): Date {
    const expiresAccessToken = new Date();
    expiresAccessToken.setTime(
      expiresAccessToken.getTime() +
        parseInt(
          this.configService.getOrThrow<string>('JWT_TOKEN_EXPIRATION_MS'),
        ),
    );
    return expiresAccessToken;
  }

  private getExpiresRefreshToken(): Date {
    const expiresRefreshToken = new Date();
    expiresRefreshToken.setTime(
      expiresRefreshToken.getTime() +
        parseInt(
          this.configService.getOrThrow<string>('JWT_REFRESH_EXPIRATION_MS'),
        ),
    );
    return expiresRefreshToken;
  }

  async verifyUserRefreshToken(refreshToken: string, userId: number) {
    try {
      const user = await this.userService.findOne(userId);
      const authenticated = await bcrypt.compare(refreshToken, user.token);

      if (!authenticated) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
