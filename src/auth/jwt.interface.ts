import { Role, UserStatus } from '@app/shared/enums';

export interface JwtPayload {
  username: string;
  userId: number;
  status: UserStatus;
  role: Role;
}
