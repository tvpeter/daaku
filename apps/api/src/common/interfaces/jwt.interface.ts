import { UserRole } from '../enums';

export interface JwtPayload {
  username: string;
  userId: number;
  role: UserRole;
}
