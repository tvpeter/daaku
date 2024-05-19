import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}
  async create(createAccountDto: CreateAccountDto) {
    const fees = this.accountRepository.create(createAccountDto);
    return await this.accountRepository.save(fees);
  }

  async findAll() {
    return await this.accountRepository.find();
  }

  async findOne(id: number) {
    const fees = await this.accountRepository.findOne({ where: { id } });

    if (!fees) throw new NotFoundException('Account not found');
    return fees;
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const account = await this.findOne(id);

    return await this.accountRepository.save({
      ...account,
      ...updateAccountDto,
    });
  }

  async remove(id: number) {
    const account = await this.findOne(id);
    return this.accountRepository.remove(account);
  }
}
