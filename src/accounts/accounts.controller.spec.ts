import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { AccountStatus, Banks } from '@app/common/enums';

describe('AccountsController', () => {
  let controller: AccountsController;

  const mockAccountsService = {
    create: jest.fn((dto) => {
      return {
        id: Math.floor(Math.random() * 100),
        created_at: Date.now(),
        updated_at: Date.now(),
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [AccountsService],
    })
      .overrideProvider(AccountsService)
      .useValue(mockAccountsService)
      .compile();

    controller = module.get<AccountsController>(AccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new account', () => {
    const dto = {
      bank: Banks.ACCESS,
      account_name: 'School account',
      account_number: 1020620557,
      status: AccountStatus.ACTIVE,
      user_id: 1,
    };

    const result = {
      id: expect.any(Number),
      created_at: expect.any(Number),
      updated_at: expect.any(Number),
      ...dto,
    };

    expect(controller.create(dto)).toEqual(result);
    expect(mockAccountsService.create).toHaveBeenCalled();
    expect(mockAccountsService.create).toHaveBeenCalledWith(dto);
  });
});
