import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './accounts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { createMockAccount } from '@app/common/utils/mock-data';
import { CreateAccountDto } from './dto/create-account.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountStatus } from '@app/common/enums';

describe('AccountsService', () => {
  let service: AccountsService;

  const mockAccountsRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: getRepositoryToken(Account),
          useValue: mockAccountsRepository,
        },
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new account', async () => {
    const createAccountDto: CreateAccountDto = createMockAccount();
    const account = { id: 1, ...createAccountDto };

    mockAccountsRepository.create.mockReturnValue(account);
    mockAccountsRepository.save.mockResolvedValue(account);

    const result = await service.create(createAccountDto);

    expect(mockAccountsRepository.create).toHaveBeenCalledWith(
      createAccountDto,
    );
    expect(mockAccountsRepository.save).toHaveBeenCalledWith(account);
    expect(result).toEqual(account);
  });

  it('should return an array of accounts', async () => {
    const account = createMockAccount();
    const accounts = [{ id: 1, ...account }];

    mockAccountsRepository.find.mockResolvedValue(accounts);

    const result = await service.findAll();

    expect(mockAccountsRepository.find).toHaveBeenCalled();
    expect(result).toEqual(accounts);
  });

  it('should return a single account', async () => {
    const mockAccount = createMockAccount();

    const account = { id: 1, ...mockAccount };

    mockAccountsRepository.findOne.mockResolvedValue(account);

    const result = await service.findOne(account.id);

    expect(mockAccountsRepository.findOne).toHaveBeenCalledWith({
      where: { id: account.id },
    });
    expect(result).toEqual(account);
  });

  it('should throw a NotFoundException if account not found', async () => {
    mockAccountsRepository.findOne.mockResolvedValue(null);

    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
  });

  it('should update an existing account', async () => {
    const mockAccount = createMockAccount();
    const updateAccountDto: UpdateAccountDto = {
      status: AccountStatus.DISABLED,
    };
    const account = { id: 1, ...mockAccount };

    mockAccountsRepository.findOne.mockResolvedValue(account);
    mockAccountsRepository.save.mockResolvedValue({
      ...account,
      ...updateAccountDto,
    });

    const result = await service.update(account.id, updateAccountDto);

    expect(mockAccountsRepository.findOne).toHaveBeenCalledWith({
      where: { id: account.id },
    });
    expect(mockAccountsRepository.save).toHaveBeenCalledWith({
      ...account,
      ...updateAccountDto,
    });
    expect(result).toEqual({ ...account, ...updateAccountDto });
  });

  it('should remove an existing account', async () => {
    const mockAccount = createMockAccount();
    const account = { id: 1, ...mockAccount };

    mockAccountsRepository.findOne.mockResolvedValue(account);
    mockAccountsRepository.remove.mockResolvedValue(account);

    const result = await service.remove(account.id);

    expect(mockAccountsRepository.findOne).toHaveBeenCalledWith({
      where: { id: account.id },
    });
    expect(mockAccountsRepository.remove).toHaveBeenCalledWith(account);
    expect(result).toEqual(account);
  });
});
