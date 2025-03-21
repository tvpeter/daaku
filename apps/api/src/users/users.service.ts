import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { UserRole, UserStatus } from '@app/common/enums';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hash = await this.hashPassword(createUserDto.password);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hash,
    });
    const newUser = await this.userRepository.save(user);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = newUser;

    return rest;
  }

  async findAll() {
    return await this.userRepository.find({
      select: [
        'id',
        'name',
        'phone',
        'email',
        'status',
        'role',
        'created_at',
        'updated_at',
      ],
    });
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findUser(id: number): Promise<Partial<User> | null> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { studentClass: true },
    });
    if (!user) throw new NotFoundException();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, token, ...rest } = user;
    return rest;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    return await this.userRepository.save({
      ...user,
      ...updateUserDto,
    });
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }

  async findByUsername(username: string): Promise<Partial<User> | null> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    //all data as is used for login
    return user;
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(
      password,
      Number(this.configService.getOrThrow('SALT_ROUNDS')),
    );
  }

  async getActiveStaffIDs(): Promise<number[] | []> {
    const staffIds = await this.userRepository.find({
      where: { status: UserStatus.ACTIVE, role: UserRole.STAFF },
      select: ['id'],
    });

    return staffIds?.map((user) => user.id) || [];
  }
}
