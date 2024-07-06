import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '@app/users/entities/user.entity';
import { CreateUserDto } from '@app/users/dto/create-user.dto';
import { faker } from '@faker-js/faker';
import { UserRole } from '@app/common/enums';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('TRUNCATE "users" RESTART IDENTITY;');

    const repository = dataSource.getRepository(User);

    const data: CreateUserDto[] = [];

    for (let i = 0; i < 100; i++) {
      data.push({
        name: faker.person.fullName(),
        username: faker.person.middleName(),
        password: faker.internet.password(),
        sig_url: faker.internet.url(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        role: faker.helpers.enumValue(UserRole),
      });
    }

    await repository.save(data);
  }
}
