import { UsersService } from '@app/users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
  }
}
