import { UserRole } from '@app/common/enums';

export interface JwtPayload {
  username: string;
  userId: number;
  role: UserRole;
}
