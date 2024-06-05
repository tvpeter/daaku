import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class RequestService {
  private userId: number;
  private username: string;
  private role: string;

  setUserId(id: number): void {
    this.userId = id;
  }

  getUserId(): number {
    return this.userId;
  }

  setUsername(username: string): void {
    this.username = username;
  }

  getUsername(): string {
    return this.username;
  }

  setRole(role: string): void {
    this.role = role;
  }

  getRole(): string {
    return this.role;
  }
}
