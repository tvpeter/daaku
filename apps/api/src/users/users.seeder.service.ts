import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { faker } from '@faker-js/faker';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from '@app/common/enums';

@Injectable()
export class UsersSeederService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UsersService,
  ) {}

  async onApplicationBootstrap() {
    await this.seed();
  }

  async seed() {
    const count = await this.countAll();

    if (count === 0) {
      const data = await this.generateData();
      await this.userRepository.save(data);
    }
  }

  async countAll() {
    return await this.userRepository.count();
  }

  async generateData(): Promise<CreateUserDto[]> {
    const data: CreateUserDto[] = [];

    for (let i = 0; i < 10; i++) {
      const user = {
        name: faker.person.fullName(),
        username: faker.internet.userName(),
        password: 'testPassword123',
        sig_url: faker.internet.url(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        role: faker.helpers.enumValue(UserRole),
      };

      user.password = await this.userService.hashPassword(user.password);
      data.push(user);
    }
    return data;
  }
}
