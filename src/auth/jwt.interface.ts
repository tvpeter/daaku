import { UserRole } from '@app/shared/enums';

export interface JwtPayload {
  username: string;
  userId: number;
  role: UserRole;
}
