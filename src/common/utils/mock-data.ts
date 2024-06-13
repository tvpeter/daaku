import {
  AccountStatus,
  AnnouncementStatus,
  Banks,
  UserRole,
  UserStatus,
} from '@app/common/enums';
import { Announcement } from '@app/announcements/entities/announcement.entity';
import { User } from '@app/users/entities/user.entity';
import { Account } from '@app/accounts/entities/account.entity';
import { CreateAnnouncementDto } from '@app/announcements/dto/create-announcement.dto';
import { omit } from 'lodash';
import { CreateAccountDto } from '@app/accounts/dto/create-account.dto';

export const createMockUser = (): User => {
  return {
    id: 1,
    name: `Test User`,
    username: 'test',
    password: `Test_User_password`,
    sig_url: `Test_user_sigurl`,
    phone: `090238920398`,
    email: 'email@email.com',
    status: UserStatus.ACTIVE,
    studentClass: [],
    announcements: [],
    role: UserRole.ADMIN,
    accounts: [],
    created_at: new Date(),
    updated_at: new Date(),
  };
};

export const createMockAccount = (
  id: number = 1,
  user: User = createMockUser(),
): Account => {
  return {
    id,
    bank: Banks.FIRST,
    account_name: `Test account name for ${id}`,
    account_number: 10000100010,
    status: AccountStatus.ACTIVE,
    created_at: new Date(),
    updated_at: new Date(),
    user_id: user.id,
    user,
  };
};

export const extractCreateAccountDTO = (account: Account): CreateAccountDto => {
  return omit(account, [
    'id',
    'user',
    'created_at',
    'updated_at',
  ]) as CreateAccountDto;
};

export const createMockAnnouncement = (
  id: number = 1,
  user: User = createMockUser(),
): Announcement => {
  return {
    id,
    topic: `Test Topic ${id}`,
    body: `Test Body ${id}`,
    status: AnnouncementStatus.UNPUBLISHED,
    user_id: user.id,
    user,
    created_at: new Date(),
    updated_at: new Date(),
  } as Announcement;
};

export const extractCreateAnnouncementDto = (
  announcement: Announcement,
): CreateAnnouncementDto => {
  return omit(announcement, [
    'id',
    'user',
    'created_at',
    'updated_at',
  ]) as CreateAnnouncementDto;
};

export const mockJwtPayload = () => {
  return {
    userId: 1,
    username: 'test',
    role: UserRole.STAFF,
  };
};
