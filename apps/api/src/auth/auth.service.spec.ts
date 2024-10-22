import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@app/users/users.service';
import { User } from '@app/users/entities/user.entity';
import { createMockUser, mockJwtPayload } from '@app/common/utils/mock-data';
import * as bcrypt from 'bcryptjs';
import { omit } from 'lodash';
import { UserStatus } from '@app/common/enums';
import { JwtPayload } from '@app/common/interfaces/jwt.interface';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;

  const mockJwtService = {
    sign: jest.fn(),
    blacklistedTokens: [],
  };
  const mockUsersService = {
    findByUsername: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService, UsersService],
    })
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return user data if validation succeeds', async () => {
    const user: User = createMockUser();

    mockUsersService.findByUsername.mockResolvedValue(user);

    jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);

    const resp = omit(user, ['password']);

    const result = await service.validateUser(user.username, user.password);
    expect(result).toEqual(resp);
  });

  it('should return unauthorized if user is not active', async () => {
    const user: User = createMockUser();
    user.status = UserStatus.DISABLED;

    mockUsersService.findByUsername.mockResolvedValue(user);

    await expect(
      service.validateUser(user.username, user.password),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should return unauthorised if password does not match', async () => {
    const user: User = createMockUser();
    mockUsersService.findByUsername.mockResolvedValue(user);
    jest.spyOn(bcrypt, 'compare').mockImplementation(async () => false);

    await expect(
      service.validateUser(user.username, 'wrongPassword'),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should return an access token', async () => {
    const user: User = createMockUser();

    const token = 'testToken';

    mockJwtService.sign.mockReturnValue(token);

    const result = await service.login(user);
    expect(result).toEqual({ access_token: token });
    expect(mockJwtService.sign).toHaveBeenCalledWith({
      username: user.username,
      userId: user.id,
      status: user.status,
      role: user.role,
    });
  });

  it('should return a JWT payload', async () => {
    const payload: JwtPayload = mockJwtPayload();

    const result = await service.validateUserByJwt(payload);
    expect(result).toEqual(payload);
  });

  it('should add a token to the blacklist', async () => {
    const token = 'testToken';

    await service.blacklistToken(token);
    expect(service.isTokenBlacklisted(token)).toBe(true);
  });

  it('should return true if the token is blacklisted', () => {
    const token = 'testToken';
    service.blacklistToken(token);

    const result = service.isTokenBlacklisted(token);
    expect(result).toBe(true);
  });

  it('should return false if the token is not blacklisted', () => {
    const token = 'testToken';

    const result = service.isTokenBlacklisted(token);
    expect(result).toBe(false);
  });
});
