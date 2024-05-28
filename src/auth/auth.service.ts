import { UserStatus } from '@app/shared/types';
import { User } from '@app/users/entities/user.entity';
import { UsersService } from '@app/users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Partial<User> | null> {
    const user = await this.userService.findByUsername(username);

    if (user && user.status === UserStatus.ACTIVE) {
      const check = await bcrypt.compare(password, user.password);
      if (check) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = user;
        return rest;
      }
    }
    return null;
  }

  async login(user: Partial<User>) {
    const payload = {
      username: user.username,
      userId: user.id,
      status: user.status,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
