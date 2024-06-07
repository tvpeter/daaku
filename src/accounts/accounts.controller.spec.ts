import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import {
  createMockAccount,
  extractCreateAccountDTO,
} from '@app/common/utils/mock-data';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountStatus } from '@app/common/enums';

describe('AccountsController', () => {
  let accountController: AccountsController;
  let accountService: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [
        {
          provide: AccountsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    accountController = module.get<AccountsController>(AccountsController);
    accountService = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(accountController).toBeDefined();
  });

  it('should create a new account', async () => {
    const mockAccount = createMockAccount();
    const accountDTO = extractCreateAccountDTO(mockAccount);

    jest.spyOn(accountService, 'create').mockResolvedValue(mockAccount);

    expect(await accountController.create(accountDTO)).toBe(mockAccount);
    expect(accountService.create).toHaveBeenCalled();
    expect(accountService.create).toHaveBeenCalledWith(accountDTO);
  });

  it('should update account', async () => {
    const mockAccount = createMockAccount();
    const updateAccountDto: UpdateAccountDto = {
      status: AccountStatus.DISABLED,
    };

    const result = { ...mockAccount, ...updateAccountDto };

    jest.spyOn(accountService, 'update').mockResolvedValue(result);

    expect(
      await accountController.update(mockAccount.id, updateAccountDto),
    ).toBe(result);

    expect(accountService.update).toHaveBeenCalledWith(
      mockAccount.id,
      updateAccountDto,
    );
  });

  it('should return all existinga accounts', async () => {
    const mockAccount = createMockAccount();
    const result = [mockAccount];

    jest.spyOn(accountService, 'findAll').mockResolvedValue(result);

    expect(await accountController.findAll()).toBe(result);
    expect(accountService.findAll).toHaveBeenCalled();
  });
  
});
