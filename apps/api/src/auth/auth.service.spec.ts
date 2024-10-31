import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@app/users/users.service';
import { User } from '@app/users/entities/user.entity';
import { mockJwtPayload } from '@app/common/utils/mock-data';
import * as bcrypt from 'bcryptjs';
import { UserRole, UserStatus } from '@app/common/enums';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { JwtPayload } from '@app/common/interfaces/jwt.interface';

describe('AuthService', () => {
  let service: AuthService;

  const mockJwtService = {
    sign: jest.fn(),
  };
  const mockUsersService = {
    findByUsername: jest.fn(),
    hashPassword: jest.fn(),
    update: jest.fn(),
  };
  const mockConfigService = {
    getOrThrow: jest.fn(),
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService, UsersService, ConfigService],
    })
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .overrideProvider(ConfigService)
      .useValue(mockConfigService)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user data if validation succeeds', async () => {
      const user: User = {
        username: 'testuser',
        password: 'hashedPass',
        status: UserStatus.ACTIVE,
      } as User;

      mockUsersService.findByUsername.mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);

      const result = await service.validateUser(user.username, 'plainPassword');
      expect(result).toEqual({
        username: user.username,
        password: user.password,
        status: user.status,
      });
    });

    it('should throw UnauthorizedException if user is inactive', async () => {
      const user: User = {
        username: 'testuser',
        password: 'hashedPass',
        status: UserStatus.DISABLED,
      } as User;

      mockUsersService.findByUsername.mockResolvedValue(user);

      await expect(
        service.validateUser(user.username, user.password),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      const user: User = {
        username: 'testuser',
        password: 'hashedPass',
        status: UserStatus.ACTIVE,
      } as User;

      mockUsersService.findByUsername.mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => false);

      await expect(
        service.validateUser(user.username, 'wrongPassword'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('login', () => {
    it('should login successfully and set a cookie', async () => {
      const mockUser: Partial<User> = {
        username: 'testuser',
        id: 1,
        status: UserStatus.ACTIVE,
        role: UserRole.STAFF,
      };

      const mockResponse = {
        cookie: jest.fn(),
      } as unknown as Response;

      mockConfigService.getOrThrow.mockReturnValue('3600000');
      mockConfigService.get.mockReturnValue('development');

      const mockToken = 'mockJwtToken';
      mockJwtService.sign.mockReturnValue(mockToken);

      const result = await service.login(mockUser, mockResponse);

      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'Authentication',
        mockToken,
        expect.objectContaining({
          httpOnly: true,
          secure: false,
        }),
      );

      expect(result).toEqual({ message: 'Login successful' });
    });

    it('should set secure flag to true if environment is production', async () => {
      const mockUser: Partial<User> = {
        username: 'testuser',
        id: 1,
        status: UserStatus.ACTIVE,
        role: UserRole.STAFF,
      };

      const mockResponse = {
        cookie: jest.fn(),
      } as unknown as Response;

      mockConfigService.getOrThrow.mockReturnValue('3600000');
      mockConfigService.get.mockImplementation((key: string) =>
        key === 'NODE_ENV' ? 'production' : 'development',
      );

      const mockToken = 'mockJwtToken';
      mockJwtService.sign.mockReturnValue(mockToken);

      await service.login(mockUser, mockResponse);

      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'Authentication',
        mockToken,
        expect.objectContaining({
          httpOnly: true,
          secure: true,
        }),
      );
    });
  });

  describe('validateUserByJwt', () => {
    it('should return a JWT payload', async () => {
      const payload: JwtPayload = mockJwtPayload();
      const result = await service.validateUserByJwt(payload);
      expect(result).toEqual(payload);
    });
  });

  describe('blacklistToken', () => {
    it('should add token to blacklist', async () => {
      const token = 'mockToken';
      await service.blacklistToken(token);

      expect(service.getBlacklistedTokens()).toContain(token);
    });
  });

  describe('isTokenBlacklisted', () => {
    it('should return true if token is blacklisted', () => {
      const token = 'mockToken';
      service.blacklistToken(token);

      const result = service.isTokenBlacklisted(token);
      expect(result).toBe(true);
    });

    it('should return false if token is not blacklisted', () => {
      const result = service.isTokenBlacklisted('nonBlacklistedToken');
      expect(result).toBe(false);
    });
  });

  describe('getBlacklistedTokens', () => {
    it('should return all blacklisted tokens', () => {
      const tokens = ['token1', 'token2'];
      tokens.forEach((token) => service.blacklistToken(token));

      const result = service.getBlacklistedTokens();
      expect(result).toEqual(tokens);
    });
  });
});
