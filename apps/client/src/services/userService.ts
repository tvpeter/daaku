import httpService from "./httpService";

export enum UserStatus {
    Active = 'active',
    Disabled = 'disabled'
  }
export interface User {
    id: number;
    name: string;
    phone: string;
    email: string;
    status: UserStatus,
    role: string;
    created_at: Date,
    updated_at?: Date,
}

export default httpService('/users');
